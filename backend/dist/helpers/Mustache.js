"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstName = exports.greeting = void 0;
const mustache_1 = __importDefault(require("mustache"));
const greeting = () => {
    const greetings = ["Boa madrugada", "Bom dia", "Boa tarde", "Boa noite"];
    const h = new Date().getHours();
    // eslint-disable-next-line no-bitwise
    return greetings[(h / 6) >> 0];
};
exports.greeting = greeting;
const firstName = (contact) => {
    if (contact && contact?.name) {
        const nameArr = contact?.name.split(' ');
        return nameArr[0];
    }
    return '';
};
exports.firstName = firstName;
exports.default = (body, contact) => {
    let ms = "";
    const Hr = new Date();
    const dd = `0${Hr.getDate()}`.slice(-2);
    const mm = `0${Hr.getMonth() + 1}`.slice(-2);
    const yy = Hr.getFullYear().toString();
    const hh = Hr.getHours();
    const min = `0${Hr.getMinutes()}`.slice(-2);
    const ss = `0${Hr.getSeconds()}`.slice(-2);
    if (hh >= 6) {
        ms = "Bom dia";
    }
    if (hh > 11) {
        ms = "Boa tarde";
    }
    if (hh > 17) {
        ms = "Boa noite";
    }
    if (hh > 23 || hh < 6) {
        ms = "Boa madrugada";
    }
    const protocol = yy + mm + dd + String(hh) + min + ss;
    const hora = `${hh}:${min}:${ss}`;
    const view = {
        firstName: (0, exports.firstName)(contact),
        name: contact ? contact.name : "",
        gretting: (0, exports.greeting)(),
        ms,
        protocol,
        hora
    };
    return mustache_1.default.render(body, view);
};
