"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("../../models/Events"));


const ListService = async ({date, id}) => {
    var wheres = {};
    if(id){
        wheres.id = id;
    }
    if(date){
        wheres.date = date;
    }

    const event = await Events_1.default.findAll({
        where: wheres,
        order: [["id", "ASC"]]
    });
    return event;
};



exports.default = ListService;