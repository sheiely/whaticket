"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelService = void 0;
const sequelize_1 = require("sequelize");
const Campaign_1 = __importDefault(require("../../models/Campaign"));
const CampaignShipping_1 = __importDefault(require("../../models/CampaignShipping"));
const queues_1 = require("../../queues");
async function CancelService(id) {
    const campaign = await Campaign_1.default.findByPk(id);
    await campaign.update({ status: "CANCELADA" });
    const recordsToCancel = await CampaignShipping_1.default.findAll({
        where: {
            campaignId: campaign.id,
            jobId: { [sequelize_1.Op.not]: null },
            deliveredAt: null
        }
    });
    const promises = [];
    for (let record of recordsToCancel) {
        const job = await queues_1.campaignQueue.getJob(+record.jobId);
        promises.push(job.remove());
    }
    await Promise.all(promises);
}
exports.CancelService = CancelService;
