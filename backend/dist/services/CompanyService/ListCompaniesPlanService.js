"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../../models/Company"));
const Plan_1 = __importDefault(require("../../models/Plan"));
const ListCompaniesPlanService = async () => {
    const companies = await Company_1.default.findAll({
        attributes: ["id", "name", "email", "status", "dueDate", "createdAt", "phone"],
        order: [["name", "ASC"]],
        include: [
            {
                model: Plan_1.default, as: "plan",
                attributes: [
                    "id",
                    "name",
                    "users",
                    "connections",
                    "queues",
                    "value",
                    "useCampaigns",
                    "useSchedules",
                    "useInternalChat",
                    "useExternalApi",
                    "useKanban",
                    "useOpenAi",
                    "useIntegrations"
                ]
            },
        ]
    });
    return companies;
};
exports.default = ListCompaniesPlanService;
