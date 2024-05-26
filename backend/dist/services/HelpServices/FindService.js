"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Help_1 = __importDefault(require("../../models/Help"));
const FindService = async () => {
    const notes = await Help_1.default.findAll({
        order: [["title", "ASC"]]
    });
    return notes;
};
exports.default = FindService;
