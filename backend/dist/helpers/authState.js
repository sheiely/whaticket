"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = require("@whiskeysockets/baileys");
const KEY_MAP = {
    "pre-key": "preKeys",
    session: "sessions",
    "sender-key": "senderKeys",
    "app-state-sync-key": "appStateSyncKeys",
    "app-state-sync-version": "appStateVersions",
    "sender-key-memory": "senderKeyMemory"
};
const authState = async (whatsapp) => {
    let creds;
    let keys = {};
    const saveState = async () => {
        try {
            await whatsapp.update({
                session: JSON.stringify({ creds, keys }, baileys_1.BufferJSON.replacer, 0)
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    // const getSessionDatabase = await whatsappById(whatsapp.id);
    if (whatsapp.session && whatsapp.session !== null) {
        const result = JSON.parse(whatsapp.session, baileys_1.BufferJSON.reviver);
        creds = result.creds;
        keys = result.keys;
    }
    else {
        creds = (0, baileys_1.initAuthCreds)();
        keys = {};
    }
    return {
        state: {
            creds,
            keys: {
                get: (type, ids) => {
                    const key = KEY_MAP[type];
                    return ids.reduce((dict, id) => {
                        let value = keys[key]?.[id];
                        if (value) {
                            if (type === "app-state-sync-key") {
                                value = baileys_1.proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            dict[id] = value;
                        }
                        return dict;
                    }, {});
                },
                set: (data) => {
                    // eslint-disable-next-line no-restricted-syntax, guard-for-in
                    for (const i in data) {
                        const key = KEY_MAP[i];
                        keys[key] = keys[key] || {};
                        Object.assign(keys[key], data[i]);
                    }
                    saveState();
                }
            }
        },
        saveState
    };
};
exports.default = authState;
