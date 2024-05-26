"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBaileysChatServices = void 0;
const ShowBaileysChatService_1 = require("./ShowBaileysChatService");
const DeleteBaileysChatServices = async (whatsappId, jid) => {
    const showBaileysChatService = await (0, ShowBaileysChatService_1.ShowBaileysChatService)(whatsappId, jid);
    showBaileysChatService.destroy();
};
exports.DeleteBaileysChatServices = DeleteBaileysChatServices;
