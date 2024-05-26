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
const CampaignController = __importStar(require("../controllers/CampaignController"));
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("../config/upload"));
const upload = (0, multer_1.default)(upload_1.default);
const routes = express_1.default.Router();
routes.get("/campaigns/list", isAuth_1.default, CampaignController.findList);
routes.get("/campaigns", isAuth_1.default, CampaignController.index);
routes.get("/campaigns/:id", isAuth_1.default, CampaignController.show);
routes.post("/campaigns", isAuth_1.default, CampaignController.store);
routes.put("/campaigns/:id", isAuth_1.default, CampaignController.update);
routes.delete("/campaigns/:id", isAuth_1.default, CampaignController.remove);
routes.post("/campaigns/:id/cancel", isAuth_1.default, CampaignController.cancel);
routes.post("/campaigns/:id/restart", isAuth_1.default, CampaignController.restart);
routes.post("/campaigns/:id/media-upload", isAuth_1.default, upload.array("file"), CampaignController.mediaUpload);
routes.delete("/campaigns/:id/media-upload", isAuth_1.default, CampaignController.deleteMedia);
exports.default = routes;
