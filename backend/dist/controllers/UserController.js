"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CheckSettings_1 = __importDefault(require("../helpers/CheckSettings"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
const ListUsersService_1 = __importDefault(require("../services/UserServices/ListUsersService"));
const UpdateUserService_1 = __importDefault(require("../services/UserServices/UpdateUserService"));
const ShowUserService_1 = __importDefault(require("../services/UserServices/ShowUserService"));
const DeleteUserService_1 = __importDefault(require("../services/UserServices/DeleteUserService"));
const SimpleListService_1 = __importDefault(require("../services/UserServices/SimpleListService"));
const User_1 = __importDefault(require("../models/User"));
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { companyId, profile } = req.user;
    const { users, count, hasMore } = await (0, ListUsersService_1.default)({
        searchParam,
        pageNumber,
        companyId,
        profile
    });
    return res.json({ users, count, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { email, password, name, profile, companyId: bodyCompanyId, queueIds, whatsappId, allTicket } = req.body;
    let userCompanyId = null;
    let requestUser = null;
    if (req.user !== undefined) {
        const { companyId: cId } = req.user;
        userCompanyId = cId;
        requestUser = await User_1.default.findByPk(req.user.id);
    }
    const newUserCompanyId = bodyCompanyId || userCompanyId;
    if (req.url === "/signup") {
        if (await (0, CheckSettings_1.default)("userCreation") === "disabled") {
            throw new AppError_1.default("ERR_USER_CREATION_DISABLED", 403);
        }
    }
    else if (req.user?.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    else if (newUserCompanyId !== req.user?.companyId && !requestUser?.super) {
        throw new AppError_1.default("ERR_NO_SUPER", 403);
    }
    const user = await (0, CreateUserService_1.default)({
        email,
        password,
        name,
        profile,
        companyId: newUserCompanyId,
        queueIds,
        whatsappId,
        allTicket
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${userCompanyId}-mainchannel`).emit(`company-${userCompanyId}-user`, {
        action: "create",
        user
    });
    return res.status(200).json(user);
};
exports.store = store;
const show = async (req, res) => {
    const { userId } = req.params;
    const user = await (0, ShowUserService_1.default)(userId);
    return res.status(200).json(user);
};
exports.show = show;
const update = async (req, res) => {
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const { id: requestUserId, companyId } = req.user;
    const { userId } = req.params;
    const userData = req.body;
    const user = await (0, UpdateUserService_1.default)({
        userData,
        userId,
        companyId,
        requestUserId: +requestUserId
    });
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-user`, {
        action: "update",
        user
    });
    return res.status(200).json(user);
};
exports.update = update;
const remove = async (req, res) => {
    const { userId } = req.params;
    const { companyId } = req.user;
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    await (0, DeleteUserService_1.default)(userId, companyId);
    const io = (0, socket_1.getIO)();
    io.to(`company-${companyId}-mainchannel`).emit(`company-${companyId}-user`, {
        action: "delete",
        userId
    });
    return res.status(200).json({ message: "User deleted" });
};
exports.remove = remove;
const list = async (req, res) => {
    const { companyId } = req.query;
    const { companyId: userCompanyId } = req.user;
    const users = await (0, SimpleListService_1.default)({
        companyId: companyId ? +companyId : userCompanyId
    });
    return res.status(200).json(users);
};
exports.list = list;
