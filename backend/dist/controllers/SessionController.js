"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.me = exports.update = exports.store = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const socket_1 = require("../libs/socket");
const AuthUserService_1 = __importDefault(require("../services/UserServices/AuthUserService"));
const SendRefreshToken_1 = require("../helpers/SendRefreshToken");
const RefreshTokenService_1 = require("../services/AuthServices/RefreshTokenService");
const FindUserFromToken_1 = __importDefault(require("../services/AuthServices/FindUserFromToken"));
const User_1 = __importDefault(require("../models/User"));
const store = async (req, res) => {
    const { email, password } = req.body;
    const { token, serializedUser, refreshToken } = await (0, AuthUserService_1.default)({
        email,
        password
    });
    (0, SendRefreshToken_1.SendRefreshToken)(res, refreshToken);
    const io = (0, socket_1.getIO)();
    io.to(`user-${serializedUser.id}`).emit(`company-${serializedUser.companyId}-auth`, {
        action: "update",
        user: {
            id: serializedUser.id,
            email: serializedUser.email,
            companyId: serializedUser.companyId
        }
    });
    return res.status(200).json({
        token,
        user: serializedUser
    });
};
exports.store = store;
const update = async (req, res) => {
    const token = req.cookies.jrt;
    if (!token) {
        throw new AppError_1.default("ERR_SESSION_EXPIRED", 401);
    }
    const { user, newToken, refreshToken } = await (0, RefreshTokenService_1.RefreshTokenService)(res, token);
    (0, SendRefreshToken_1.SendRefreshToken)(res, refreshToken);
    return res.json({ token: newToken, user });
};
exports.update = update;
const me = async (req, res) => {
    const token = req.cookies.jrt;
    const user = await (0, FindUserFromToken_1.default)(token);
    const { id, profile, super: superAdmin } = user;
    if (!token) {
        throw new AppError_1.default("ERR_SESSION_EXPIRED", 401);
    }
    return res.json({ id, profile, super: superAdmin });
};
exports.me = me;
const remove = async (req, res) => {
    const { id } = req.user;
    const user = await User_1.default.findByPk(id);
    await user.update({ online: false });
    res.clearCookie("jrt");
    return res.send();
};
exports.remove = remove;
