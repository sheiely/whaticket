"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const baileys_1 = require("@whiskeysockets/baileys");
const wbotMessageListener_1 = require("../WbotServices/wbotMessageListener");
const logger_1 = require("../../utils/logger");
const lodash_1 = require("lodash");
const UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
const typebotListener = async ({ wbot, msg, ticket, typebot }) => {
    if (msg.key.remoteJid === 'status@broadcast')
        return;
    const { urlN8N: url, typebotExpires, typebotKeywordFinish, typebotKeywordRestart, typebotUnknownMessage, typebotSlug, typebotDelayMessage, typebotRestartMessage } = typebot;
    const number = msg.key.remoteJid.replace(/\D/g, '');
    let body = (0, wbotMessageListener_1.getBodyMessage)(msg);
    async function createSession(msg, typebot, number) {
        try {
            const id = Math.floor(Math.random() * 10000000000).toString();
            const reqData = JSON.stringify({
                "isStreamEnabled": true,
                "message": "string",
                "resultId": "string",
                "isOnlyRegistering": false,
                "prefilledVariables": {
                    "number": number,
                    "pushName": msg.pushName || ""
                },
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${url}/api/v1/typebots/${typebotSlug}/startChat`,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: reqData
            };
            const request = await axios_1.default.request(config);
            return request.data;
        }
        catch (err) {
            logger_1.logger.info("Erro ao criar sessão do typebot: ", err);
            throw err;
        }
    }
    let sessionId;
    let dataStart;
    let status = false;
    try {
        const dataLimite = new Date();
        dataLimite.setMinutes(dataLimite.getMinutes() - Number(typebotExpires));
        if (typebotExpires > 0 && ticket.updatedAt < dataLimite) {
            await ticket.update({
                typebotSessionId: null,
                isBot: true
            });
            await ticket.reload();
        }
        if ((0, lodash_1.isNil)(ticket.typebotSessionId)) {
            dataStart = await createSession(msg, typebot, number);
            sessionId = dataStart.sessionId;
            status = true;
            await ticket.update({
                typebotSessionId: sessionId,
                typebotStatus: true,
                useIntegration: true,
                integrationId: typebot.id
            });
        }
        else {
            sessionId = ticket.typebotSessionId;
            status = ticket.typebotStatus;
        }
        if (!status)
            return;
        //let body = getConversationMessage(msg);
        if (body !== typebotKeywordFinish && body !== typebotKeywordRestart) {
            let requestContinue;
            let messages;
            let input;
            if (dataStart?.messages.length === 0 || dataStart === undefined) {
                const reqData = JSON.stringify({
                    "message": body
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${url}/api/v1/sessions/${sessionId}/continueChat`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: reqData
                };
                requestContinue = await axios_1.default.request(config);
                messages = requestContinue.data?.messages;
                input = requestContinue.data?.input;
            }
            else {
                messages = dataStart?.messages;
                input = dataStart?.input;
            }
            if (messages?.length === 0) {
                await wbot.sendMessage(`${number}@c.us`, { text: typebotUnknownMessage });
            }
            else {
                for (const message of messages) {
                    if (message.type === 'text') {
                        let formattedText = '';
                        let linkPreview = false;
                        for (const richText of message.content.richText) {
                            for (const element of richText.children) {
                                let text = '';
                                if (element.text) {
                                    text = element.text;
                                }
                                if (element.type && element.children) {
                                    for (const subelement of element.children) {
                                        let text = '';
                                        if (subelement.text) {
                                            text = subelement.text;
                                        }
                                        if (subelement.type && subelement.children) {
                                            for (const subelement2 of subelement.children) {
                                                let text = '';
                                                if (subelement2.text) {
                                                    text = subelement2.text;
                                                }
                                                if (subelement2.bold) {
                                                    text = `*${text}*`;
                                                }
                                                if (subelement2.italic) {
                                                    text = `_${text}_`;
                                                }
                                                if (subelement2.underline) {
                                                    text = `~${text}~`;
                                                }
                                                if (subelement2.url) {
                                                    const linkText = subelement2.children[0].text;
                                                    text = `[${linkText}](${subelement2.url})`;
                                                    linkPreview = true;
                                                }
                                                formattedText += text;
                                            }
                                        }
                                        if (subelement.bold) {
                                            text = `*${text}*`;
                                        }
                                        if (subelement.italic) {
                                            text = `_${text}_`;
                                        }
                                        if (subelement.underline) {
                                            text = `~${text}~`;
                                        }
                                        if (subelement.url) {
                                            const linkText = subelement.children[0].text;
                                            text = `[${linkText}](${subelement.url})`;
                                            linkPreview = true;
                                        }
                                        formattedText += text;
                                    }
                                }
                                if (element.bold) {
                                    text = `*${text}*`;
                                }
                                if (element.italic) {
                                    text = `_${text}_`;
                                }
                                if (element.underline) {
                                    text = `~${text}~`;
                                }
                                if (element.url) {
                                    const linkText = element.children[0].text;
                                    text = `[${linkText}](${element.url})`;
                                    linkPreview = true;
                                }
                                formattedText += text;
                            }
                            formattedText += '\n';
                        }
                        formattedText = formattedText.replace('**', '').replace(/\n$/, '');
                        if (formattedText === "Invalid message. Please, try again.") {
                            formattedText = typebotUnknownMessage;
                        }
                        if (formattedText.startsWith("#")) {
                            let gatilho = formattedText.replace("#", "");
                            try {
                                let jsonGatilho = JSON.parse(gatilho);
                                if (jsonGatilho.stopBot && (0, lodash_1.isNil)(jsonGatilho.userId) && (0, lodash_1.isNil)(jsonGatilho.queueId)) {
                                    await ticket.update({
                                        useIntegration: false,
                                        isBot: false
                                    });
                                    return;
                                }
                                if (!(0, lodash_1.isNil)(jsonGatilho.queueId) && jsonGatilho.queueId > 0 && (0, lodash_1.isNil)(jsonGatilho.userId)) {
                                    await (0, UpdateTicketService_1.default)({
                                        ticketData: {
                                            queueId: jsonGatilho.queueId,
                                            chatbot: false,
                                            useIntegration: false,
                                            integrationId: null
                                        },
                                        ticketId: ticket.id,
                                        companyId: ticket.companyId
                                    });
                                    return;
                                }
                                if (!(0, lodash_1.isNil)(jsonGatilho.queueId) && jsonGatilho.queueId > 0 && !(0, lodash_1.isNil)(jsonGatilho.userId) && jsonGatilho.userId > 0) {
                                    await (0, UpdateTicketService_1.default)({
                                        ticketData: {
                                            queueId: jsonGatilho.queueId,
                                            userId: jsonGatilho.userId,
                                            chatbot: false,
                                            useIntegration: false,
                                            integrationId: null
                                        },
                                        ticketId: ticket.id,
                                        companyId: ticket.companyId
                                    });
                                    return;
                                }
                            }
                            catch (err) {
                                throw err;
                            }
                        }
                        await wbot.presenceSubscribe(msg.key.remoteJid);
                        //await delay(2000)
                        await wbot.sendPresenceUpdate('composing', msg.key.remoteJid);
                        await (0, baileys_1.delay)(typebotDelayMessage);
                        await wbot.sendPresenceUpdate('paused', msg.key.remoteJid);
                        await wbot.sendMessage(msg.key.remoteJid, { text: formattedText });
                    }
                    if (message.type === 'audio') {
                        await wbot.presenceSubscribe(msg.key.remoteJid);
                        //await delay(2000)
                        await wbot.sendPresenceUpdate('composing', msg.key.remoteJid);
                        await (0, baileys_1.delay)(typebotDelayMessage);
                        await wbot.sendPresenceUpdate('paused', msg.key.remoteJid);
                        const media = {
                            audio: {
                                url: message.content.url,
                                mimetype: 'audio/mp4',
                                ptt: true
                            },
                        };
                        await wbot.sendMessage(msg.key.remoteJid, media);
                    }
                    // if (message.type === 'embed') {
                    //     await wbot.presenceSubscribe(msg.key.remoteJid)
                    //     //await delay(2000)
                    //     await wbot.sendPresenceUpdate('composing', msg.key.remoteJid)
                    //     await delay(typebotDelayMessage)
                    //     await wbot.sendPresenceUpdate('paused', msg.key.remoteJid)
                    //     const media = {
                    //         document: { url: message.content.url },
                    //         mimetype: 'application/pdf',
                    //         caption: ""
                    //     }
                    //     await wbot.sendMessage(msg.key.remoteJid, media);
                    // }
                    if (message.type === 'image') {
                        await wbot.presenceSubscribe(msg.key.remoteJid);
                        //await delay(2000)
                        await wbot.sendPresenceUpdate('composing', msg.key.remoteJid);
                        await (0, baileys_1.delay)(typebotDelayMessage);
                        await wbot.sendPresenceUpdate('paused', msg.key.remoteJid);
                        const media = {
                            image: {
                                url: message.content.url,
                            },
                        };
                        await wbot.sendMessage(msg.key.remoteJid, media);
                    }
                    // if (message.type === 'video' ) {
                    //     await wbot.presenceSubscribe(msg.key.remoteJid)
                    //     //await delay(2000)
                    //     await wbot.sendPresenceUpdate('composing', msg.key.remoteJid)
                    //     await delay(typebotDelayMessage)
                    //     await wbot.sendPresenceUpdate('paused', msg.key.remoteJid)
                    //     const media = {
                    //         video: {
                    //             url: message.content.url,
                    //         },
                    //     }
                    //     await wbot.sendMessage(msg.key.remoteJid, media);
                    // }
                }
                if (input) {
                    if (input.type === 'choice input') {
                        let formattedText = '';
                        const items = input.items;
                        for (const item of items) {
                            formattedText += `▶️ ${item.content}\n`;
                        }
                        formattedText = formattedText.replace(/\n$/, '');
                        await wbot.presenceSubscribe(msg.key.remoteJid);
                        //await delay(2000)
                        await wbot.sendPresenceUpdate('composing', msg.key.remoteJid);
                        await (0, baileys_1.delay)(typebotDelayMessage);
                        await wbot.sendPresenceUpdate('paused', msg.key.remoteJid);
                        await wbot.sendMessage(msg.key.remoteJid, { text: formattedText });
                    }
                }
            }
        }
        if (body === typebotKeywordRestart) {
            await ticket.update({
                isBot: true,
                typebotSessionId: null
            });
            await ticket.reload();
            await wbot.sendMessage(`${number}@c.us`, { text: typebotRestartMessage });
        }
        if (body === typebotKeywordFinish) {
            await (0, UpdateTicketService_1.default)({
                ticketData: {
                    status: "closed",
                    useIntegration: false,
                    integrationId: null
                },
                ticketId: ticket.id,
                companyId: ticket.companyId
            });
            return;
        }
    }
    catch (error) {
        logger_1.logger.info("Error on typebotListener: ", error);
        await ticket.update({
            typebotSessionId: null
        });
        throw error;
    }
};
exports.default = typebotListener;
