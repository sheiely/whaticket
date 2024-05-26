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
const CompanyController = __importStar(require("../controllers/CompanyController"));
const companyRoutes = express_1.default.Router();
companyRoutes.get("/companies/list", isAuth_1.default, isSuper_1.default, CompanyController.list);
companyRoutes.get("/companies", isAuth_1.default, isSuper_1.default, CompanyController.index);
companyRoutes.get("/companies/:id", isAuth_1.default, CompanyController.show);
companyRoutes.post("/companies", isAuth_1.default, isSuper_1.default, CompanyController.store);
companyRoutes.put("/companies/:id", isAuth_1.default, isSuper_1.default, CompanyController.update);
companyRoutes.put("/companies/:id/schedules", isAuth_1.default, CompanyController.updateSchedules);
companyRoutes.delete("/companies/:id", isAuth_1.default, isSuper_1.default, CompanyController.remove);
companyRoutes.post("/companies/cadastro", CompanyController.store);
// Rota para listar o plano da empresa
companyRoutes.get("/companies/listPlan/:id", isAuth_1.default, CompanyController.listPlan);
companyRoutes.get("/companiesPlan", isAuth_1.default, CompanyController.indexPlan);
exports.default = companyRoutes;
