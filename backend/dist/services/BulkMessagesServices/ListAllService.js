"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BulkMessages_1 = __importDefault(require("../../models/BulkMessages"));
const FindAllService = async () => {
    const Bmsg = await BulkMessages_1.default.findAll({
        order: [["id", "ASC"]]
    });
    return Bmsg;
};
exports.default = FindAllService;
