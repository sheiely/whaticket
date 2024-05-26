"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeUser = void 0;
const SerializeUser = async (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        companyId: user.companyId,
        company: user.company,
        super: user.super,
        queues: user.queues,
        allTicket: user.allTicket,
    };
};
exports.SerializeUser = SerializeUser;
