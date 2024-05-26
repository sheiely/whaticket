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
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const upload_1 = __importDefault(require("../config/upload"));
const multer_1 = __importDefault(require("multer"));
const FilesController = __importStar(require("../controllers/FilesController"));
const upload = (0, multer_1.default)(upload_1.default);
const filesRoutes = express_1.default.Router();
filesRoutes.get("/files/list", isAuth_1.default, FilesController.list);
filesRoutes.get("/files", isAuth_1.default, FilesController.index);
filesRoutes.post("/files", isAuth_1.default, FilesController.store);
filesRoutes.put("/files/:fileId", isAuth_1.default, FilesController.update);
filesRoutes.get("/files/:fileId", isAuth_1.default, FilesController.show);
filesRoutes.delete("/files/:fileId", isAuth_1.default, FilesController.remove);
filesRoutes.delete("/files", isAuth_1.default, FilesController.removeAll);
filesRoutes.post("/files/uploadList/:fileListId", isAuth_1.default, upload.array("files"), FilesController.uploadMedias);
exports.default = filesRoutes;
