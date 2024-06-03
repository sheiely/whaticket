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
exports.remove = exports.update = exports.show = exports.store = exports.list = exports.index = void 0;
const Yup = __importStar(require("yup"));
// import { getIO } from "../libs/socket";
const AppError_1 = __importDefault(require("../errors/AppError"));
const CreateService_1 = __importDefault(require("../services/EventsServices/CreateService"));
const ShowService_1 = __importDefault(require("../services/EventsServices/ShowService"));
const FindAllService_1 = __importDefault(require("../services/EventsServices/ListService"));
const DeleteService_1 = __importDefault(require("../services/EventsServices/RemoveService"));

const list = async (req, res) => {
    const plans = await (0, FindAllService_1.default)();
    return res.status(200).json(plans);
};
exports.list = list;
const store = async (req, res) => {
    const newBmsg = req.body;
    // const schema = Yup.object().shape({
    //     name: Yup.string().required()
    // });
    // try {
    //     await schema.validate(newPlan);
    // }
    // catch (err) {
    //     throw new AppError_1.default(err.message);
    // }
    const Bmsg = await (0, CreateService_1.default)(newBmsg);
    return res.status(200).json(Bmsg);
};
exports.store = store;
const show = async (req, res) => {
    const { id } = req.params;
    const Bmsg = await (0, ShowService_1.default)(id);
    return res.status(200).json(Bmsg);
};
exports.show = show;

const remove = async (req, res) => {
    const { id } = req.params;
    const Bmsg = await (0, DeleteService_1.default)(id);
    return res.status(200).json(Bmsg);
};
exports.remove = remove;
