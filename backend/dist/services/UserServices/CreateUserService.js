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
const SerializeUser_1 = require("../../helpers/SerializeUser");
const User_1 = __importDefault(require("../../models/User"));
const Plan_1 = __importDefault(require("../../models/Plan"));
const Company_1 = __importDefault(require("../../models/Company"));
const CreateUserService = async ({ email, password, name, queueIds = [], companyId, profile = "admin", whatsappId, allTicket }) => {
    if (companyId !== undefined) {
        const company = await Company_1.default.findOne({
            where: {
                id: companyId
            },
            include: [{ model: Plan_1.default, as: "plan" }]
        });
        if (company !== null) {
            const usersCount = await User_1.default.count({
                where: {
                    companyId
                }
            });
            if (usersCount >= company.plan.users) {
                throw new AppError_1.default(`Número máximo de usuários já alcançado: ${usersCount}`);
            }
        }
    }
    const schema = Yup.object().shape({
        name: Yup.string().required().min(2),
        email: Yup.string()
            .email()
            .required()
            .test("Check-email", "An user with this email already exists.", async (value) => {
            if (!value)
                return false;
            const emailExists = await User_1.default.findOne({
                where: { email: value }
            });
            return !emailExists;
        }),
        password: Yup.string().required().min(5)
    });
    try {
        await schema.validate({ email, password, name });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const user = await User_1.default.create({
        email,
        password,
        name,
        companyId,
        profile,
        whatsappId: whatsappId || null,
        allTicket
    }, { include: ["queues", "company"] });
    await user.$set("queues", queueIds);
    await user.reload();
    const serializedUser = (0, SerializeUser_1.SerializeUser)(user);
    return serializedUser;
};
exports.default = CreateUserService;
