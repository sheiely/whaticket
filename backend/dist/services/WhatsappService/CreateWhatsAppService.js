"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const Company_1 = __importDefault(require("../../models/Company"));
const Plan_1 = __importDefault(require("../../models/Plan"));
const AssociateWhatsappQueue_1 = __importDefault(require("./AssociateWhatsappQueue"));
const CreateWhatsAppService = async ({ name, status = "OPENING", queueIds = [], greetingMessage, complationMessage, outOfHoursMessage, ratingMessage, isDefault = false, companyId, token = "", provider = "beta", 
//timeSendQueue,
//sendIdQueue,
transferQueueId, timeToTransfer, promptId, maxUseBotQueues = 3, timeUseBotQueues = 0, expiresTicket = 0, expiresInactiveMessage = "" }) => {
    const company = await Company_1.default.findOne({
        where: {
            id: companyId
        },
        include: [{ model: Plan_1.default, as: "plan" }]
    });
    if (company !== null) {
        const whatsappCount = await Whatsapp_1.default.count({
            where: {
                companyId
            }
        });
        if (whatsappCount >= company.plan.connections) {
            throw new AppError_1.default(`Número máximo de conexões já alcançado: ${whatsappCount}`);
        }
    }
    const schema = Yup.object().shape({
        name: Yup.string()
            .required()
            .min(2)
            .test("Check-name", "Esse nome já está sendo utilizado por outra conexão", async (value) => {
            if (!value)
                return false;
            const nameExists = await Whatsapp_1.default.findOne({
                where: { name: value }
            });
            return !nameExists;
        }),
        isDefault: Yup.boolean().required()
    });
    try {
        await schema.validate({ name, status, isDefault });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const whatsappFound = await Whatsapp_1.default.findOne({ where: { companyId } });
    isDefault = !whatsappFound;
    let oldDefaultWhatsapp = null;
    if (isDefault) {
        oldDefaultWhatsapp = await Whatsapp_1.default.findOne({
            where: { isDefault: true, companyId }
        });
        if (oldDefaultWhatsapp) {
            await oldDefaultWhatsapp.update({ isDefault: false, companyId });
        }
    }
    if (queueIds.length > 1 && !greetingMessage) {
        throw new AppError_1.default("ERR_WAPP_GREETING_REQUIRED");
    }
    if (token !== null && token !== "") {
        const tokenSchema = Yup.object().shape({
            token: Yup.string()
                .required()
                .min(2)
                .test("Check-token", "This whatsapp token is already used.", async (value) => {
                if (!value)
                    return false;
                const tokenExists = await Whatsapp_1.default.findOne({
                    where: { token: value }
                });
                return !tokenExists;
            })
        });
        try {
            await tokenSchema.validate({ token });
        }
        catch (err) {
            throw new AppError_1.default(err.message);
        }
    }
    const whatsapp = await Whatsapp_1.default.create({
        name,
        status,
        greetingMessage,
        complationMessage,
        outOfHoursMessage,
        ratingMessage,
        isDefault,
        companyId,
        token,
        provider,
        //timeSendQueue,
        //sendIdQueue,
        transferQueueId,
        timeToTransfer,
        promptId,
        maxUseBotQueues,
        timeUseBotQueues,
        expiresTicket,
        expiresInactiveMessage
    }, { include: ["queues"] });
    await (0, AssociateWhatsappQueue_1.default)(whatsapp, queueIds);
    return { whatsapp, oldDefaultWhatsapp };
};
exports.default = CreateWhatsAppService;
