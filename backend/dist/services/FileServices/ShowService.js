"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Files_1 = __importDefault(require("../../models/Files"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const FilesOptions_1 = __importDefault(require("../../models/FilesOptions"));
const ShowFileService = async (id, companyId) => {
    const fileList = await Files_1.default.findOne({
        where: { id, companyId },
        include: [
            "options",
            {
                model: FilesOptions_1.default,
                as: "options",
                order: [["id", "ASC"]]
            }
        ]
    });
    if (!fileList) {
        throw new AppError_1.default("ERR_NO_FILE_FOUND", 404);
    }
    return fileList;
};
exports.default = ShowFileService;
