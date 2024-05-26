"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswords = exports.store = void 0;
const uuid_1 = require("uuid");
const SendMail_1 = __importDefault(require("../services/ForgotPassWordServices/SendMail"));
const ResetPassword_1 = __importDefault(require("../services/ResetPasswordService/ResetPassword"));
const store = async (req, res) => {
    const { email } = req.params;
    const TokenSenha = (0, uuid_1.v4)();
    const forgotPassword = await (0, SendMail_1.default)(email, TokenSenha);
    if (!forgotPassword) {
        return res.status(200).json({ message: "E-mail enviado com sucesso" });
    }
    return res.status(404).json({ error: "E-mail enviado com sucesso" });
};
exports.store = store;
const resetPasswords = async (req, res) => {
    const { email, token, password } = req.params;
    const resetPassword = await (0, ResetPassword_1.default)(email, token, password);
    if (!resetPassword) {
        return res.status(200).json({ message: "Senha redefinida com sucesso" });
    }
    return res.status(404).json({ error: "Verifique o Token informado" });
};
exports.resetPasswords = resetPasswords;
