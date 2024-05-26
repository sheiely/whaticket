"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CampaignSetting_1 = __importDefault(require("../../models/CampaignSetting"));
const lodash_1 = require("lodash");
const CreateService = async (data, companyId) => {
    const settings = [];
    for (let settingKey of Object.keys(data.settings)) {
        const value = (0, lodash_1.isArray)(data.settings[settingKey]) || (0, lodash_1.isObject)(data.settings[settingKey])
            ? JSON.stringify(data.settings[settingKey])
            : data.settings[settingKey];
        const [record, created] = await CampaignSetting_1.default.findOrCreate({
            where: {
                key: settingKey,
                companyId
            },
            defaults: { key: settingKey, value, companyId }
        });
        if (!created) {
            await record.update({ value });
        }
        settings.push(record);
    }
    return settings;
};
exports.default = CreateService;
