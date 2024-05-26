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
exports.webhook = exports.createWebhook = exports.createSubscription = exports.index = void 0;
const express_1 = __importDefault(require("express"));
const Yup = __importStar(require("yup"));
const gn_api_sdk_typescript_1 = __importDefault(require("gn-api-sdk-typescript"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const Gn_1 = __importDefault(require("../config/Gn"));
const Company_1 = __importDefault(require("../models/Company"));
const Invoices_1 = __importDefault(require("../models/Invoices"));
const socket_1 = require("../libs/socket");
const app = (0, express_1.default)();
const index = async (req, res) => {
    const gerencianet = (0, gn_api_sdk_typescript_1.default)(Gn_1.default);
    return res.json(gerencianet.getSubscriptions());
};
exports.index = index;
const createSubscription = async (req, res) => {
    const gerencianet = (0, gn_api_sdk_typescript_1.default)(Gn_1.default);
    const { companyId } = req.user;
    const schema = Yup.object().shape({
        price: Yup.string().required(),
        users: Yup.string().required(),
        connections: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
        throw new AppError_1.default("Validation fails", 400);
    }
    const { firstName, price, users, connections, address2, city, state, zipcode, country, plan, invoiceId } = req.body;
    const body = {
        calendario: {
            expiracao: 3600
        },
        valor: {
            original: price.toLocaleString("pt-br", { minimumFractionDigits: 2 }).replace(",", ".")
        },
        chave: process.env.GERENCIANET_PIX_KEY,
        solicitacaoPagador: `#Fatura:${invoiceId}`
    };
    try {
        const pix = await gerencianet.pixCreateImmediateCharge(null, body);
        const qrcode = await gerencianet.pixGenerateQRCode({
            id: pix.loc.id
        });
        const updateCompany = await Company_1.default.findOne();
        if (!updateCompany) {
            throw new AppError_1.default("Company not found", 404);
        }
        /*     await Subscriptions.create({
              companyId,
              isActive: false,
              userPriceCents: users,
              whatsPriceCents: connections,
              lastInvoiceUrl: pix.location,
              lastPlanChange: new Date(),
              providerSubscriptionId: pix.loc.id,
              expiresAt: new Date()
            }); */
        /*     const { id } = req.user;
            const userData = {};
            const userId = id;
            const requestUserId = parseInt(id);
            const user = await UpdateUserService({ userData, userId, companyId, requestUserId }); */
        /*     const io = getIO();
            io.emit("user", {
              action: "update",
              user
            }); */
        return res.json({
            ...pix,
            qrcode,
        });
    }
    catch (error) {
        throw new AppError_1.default("Validation fails", 400);
    }
};
exports.createSubscription = createSubscription;
const createWebhook = async (req, res) => {
    const schema = Yup.object().shape({
        chave: Yup.string().required(),
        url: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
        throw new AppError_1.default("Validation fails", 400);
    }
    const { chave, url } = req.body;
    const body = {
        webhookUrl: url
    };
    const params = {
        chave
    };
    try {
        const gerencianet = (0, gn_api_sdk_typescript_1.default)(Gn_1.default);
        const create = await gerencianet.pixConfigWebhook(params, body);
        return res.json(create);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createWebhook = createWebhook;
const webhook = async (req, res) => {
    const { type } = req.params;
    const { evento } = req.body;
    if (evento === "teste_webhook") {
        return res.json({ ok: true });
    }
    if (req.body.pix) {
        const gerencianet = (0, gn_api_sdk_typescript_1.default)(Gn_1.default);
        req.body.pix.forEach(async (pix) => {
            const detahe = await gerencianet.pixDetailCharge({
                txid: pix.txid
            });
            if (detahe.status === "CONCLUIDA") {
                const { solicitacaoPagador } = detahe;
                const invoiceID = solicitacaoPagador.replace("#Fatura:", "");
                const invoices = await Invoices_1.default.findByPk(invoiceID);
                const companyId = invoices.companyId;
                const company = await Company_1.default.findByPk(companyId);
                const expiresAt = new Date(company.dueDate);
                expiresAt.setDate(expiresAt.getDate() + 30);
                const date = expiresAt.toISOString().split("T")[0];
                if (company) {
                    await company.update({
                        dueDate: date
                    });
                    const invoi = await invoices.update({
                        id: invoiceID,
                        status: 'paid'
                    });
                    await company.reload();
                    const io = (0, socket_1.getIO)();
                    const companyUpdate = await Company_1.default.findOne({
                        where: {
                            id: companyId
                        }
                    });
                    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-payment`, {
                        action: detahe.status,
                        company: companyUpdate
                    });
                }
            }
        });
    }
    return res.json({ ok: true });
};
exports.webhook = webhook;
