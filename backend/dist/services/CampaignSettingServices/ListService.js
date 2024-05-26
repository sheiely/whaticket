"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CampaignSetting_1 = __importDefault(require("../../models/CampaignSetting"));
const ListService = async ({ companyId }) => {
    let whereCondition = {
        companyId
    };
    const records = await CampaignSetting_1.default.findAll({
        where: whereCondition
    });
    return records;
};
exports.default = ListService;
