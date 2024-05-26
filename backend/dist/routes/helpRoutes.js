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
const isSuper_1 = __importDefault(require("../middleware/isSuper"));
const HelpController = __importStar(require("../controllers/HelpController"));
const routes = express_1.default.Router();
routes.get("/helps/list", isAuth_1.default, HelpController.findList);
routes.get("/helps", isAuth_1.default, HelpController.index);
routes.get("/helps/:id", isAuth_1.default, HelpController.show);
routes.post("/helps", isAuth_1.default, isSuper_1.default, HelpController.store);
routes.put("/helps/:id", isAuth_1.default, isSuper_1.default, HelpController.update);
routes.delete("/helps/:id", isAuth_1.default, isSuper_1.default, HelpController.remove);
exports.default = routes;
