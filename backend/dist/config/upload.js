"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const publicFolder = path_1.default.resolve(__dirname, "..", "..", "public");
exports.default = {
    directory: publicFolder,
    storage: multer_1.default.diskStorage({
        destination: async function (req, file, cb) {
            const { typeArch, fileId } = req.body;
            let folder;
            if (typeArch && typeArch !== "announcements") {
                folder = path_1.default.resolve(publicFolder, typeArch, fileId ? fileId : "");
            }
            else if (typeArch && typeArch === "announcements") {
                folder = path_1.default.resolve(publicFolder, typeArch);
            }
            else {
                folder = path_1.default.resolve(publicFolder);
            }
            if (!fs_1.default.existsSync(folder)) {
                fs_1.default.mkdirSync(folder, { recursive: true });
                fs_1.default.chmodSync(folder, 0o777);
            }
            return cb(null, folder);
        },
        filename(req, file, cb) {
            const { typeArch } = req.body;
            const fileName = typeArch && typeArch !== "announcements" ? file.originalname.replace('/', '-').replace(/ /g, "_") : new Date().getTime() + '_' + file.originalname.replace('/', '-').replace(/ /g, "_");
            return cb(null, fileName);
        }
    })
};
