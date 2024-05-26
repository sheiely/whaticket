"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestartService = void 0;
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const queues_1 = require("../../queues");
async function RestartService(id) {
    const campaign = await Campaign_1.default.findByPk(id);
    await campaign.update({ status: "EM_ANDAMENTO" });
    await queues_1.campaignQueue.add("ProcessCampaign", {
        id: campaign.id,
        delay: 3000
    });
}
exports.RestartService = RestartService;
