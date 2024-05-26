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
const Queue_1 = __importDefault(require("../../models/Queue"));
const Company_1 = __importDefault(require("../../models/Company"));
const Plan_1 = __importDefault(require("../../models/Plan"));
const CreateQueueService = async (queueData) => {
    const { color, name, companyId } = queueData;
    const company = await Company_1.default.findOne({
        where: {
            id: companyId
        },
        include: [{ model: Plan_1.default, as: "plan" }]
    });
    if (company !== null) {
        const queuesCount = await Queue_1.default.count({
            where: {
                companyId
            }
        });
        if (queuesCount >= company.plan.queues) {
            throw new AppError_1.default(`Número máximo de filas já alcançado: ${queuesCount}`);
        }
    }
    const queueSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "ERR_QUEUE_INVALID_NAME")
            .required("ERR_QUEUE_INVALID_NAME")
            .test("Check-unique-name", "ERR_QUEUE_NAME_ALREADY_EXISTS", async (value) => {
            if (value) {
                const queueWithSameName = await Queue_1.default.findOne({
                    where: { name: value, companyId }
                });
                return !queueWithSameName;
            }
            return false;
        }),
        color: Yup.string()
            .required("ERR_QUEUE_INVALID_COLOR")
            .test("Check-color", "ERR_QUEUE_INVALID_COLOR", async (value) => {
            if (value) {
                const colorTestRegex = /^#[0-9a-f]{3,6}$/i;
                return colorTestRegex.test(value);
            }
            return false;
        })
            .test("Check-color-exists", "ERR_QUEUE_COLOR_ALREADY_EXISTS", async (value) => {
            if (value) {
                const queueWithSameColor = await Queue_1.default.findOne({
                    where: { color: value, companyId }
                });
                return !queueWithSameColor;
            }
            return false;
        })
    });
    try {
        await queueSchema.validate({ color, name });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const queue = await Queue_1.default.create(queueData);
    return queue;
};
exports.default = CreateQueueService;
