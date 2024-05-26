"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blacklist_1 = __importDefault(require("../../models/Blacklists"));
const ListService = async ({ number }) => {
    const blacklist = await Blacklist_1.default.findAll({
        where: {
            number
        },
        order: [["id", "ASC"]]
    });
    return blacklist;
};
exports.default = ListService;