"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Announcement_1 = __importDefault(require("../../models/Announcement"));
const FindAllService = async () => {
    const records = await Announcement_1.default.findAll({
        order: [["createdAt", "DESC"]]
    });
    return records;
};
exports.default = FindAllService;
