"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(require("../../models/Setting"));
const ListSettingsServiceOne = async ({ companyId, key }) => {
    const setting = await Setting_1.default.findOne({
        where: {
            companyId,
            ...(key && { key })
        }
    });
    return setting;
};
exports.default = ListSettingsServiceOne;
