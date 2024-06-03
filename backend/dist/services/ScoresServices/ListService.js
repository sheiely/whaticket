"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Scores_1 = __importDefault(require("../../models/Scores"));
const Events_1 = __importDefault(require("../../models/Events"));
const ListService = async ({ number, event, cpf}) => {
    var wheres = {};
    if(number)wheres.number = number;
    if(event)wheres.event = event;
    if(cpf)wheres.cpf = cpf;
    const score = await Scores_1.default.findAll({
        where: wheres,
        order: [["id", "ASC"]],
        include: [
            {
                model: Events_1.default,
                as: "eventObject",
                attributes: ["id", "name", "date", "city", "uf"]
            }
        ]
    });
    return score;
};
exports.default = ListService;