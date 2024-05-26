"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../libs/socket");
const Contact_1 = __importDefault(require("../../models/Contact"));
const lodash_1 = require("lodash");
const CreateOrUpdateContactService = async ({ name, number: rawNumber, profilePicUrl, isGroup, email = "", companyId, extraInfo = [], whatsappId }) => {
    const number = isGroup ? rawNumber : rawNumber.replace(/[^0-9]/g, "");
    const io = (0, socket_1.getIO)();
    let contact;
    contact = await Contact_1.default.findOne({
        where: {
            number,
            companyId
        }
    });
    if (contact) {
        contact.update({ profilePicUrl });
        console.log(contact.whatsappId);
        if ((0, lodash_1.isNil)(contact.whatsappId === null)) {
            contact.update({
                whatsappId
            });
        }
        io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-contact`, {
            action: "update",
            contact
        });
    }
    else {
        contact = await Contact_1.default.create({
            name,
            number,
            profilePicUrl,
            email,
            isGroup,
            extraInfo,
            companyId,
            whatsappId
        });
        io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-contact`, {
            action: "create",
            contact
        });
    }
    return contact;
};
exports.default = CreateOrUpdateContactService;
