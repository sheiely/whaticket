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
exports.update = exports.list = exports.show = exports.index = void 0;
const Yup = __importStar(require("yup"));
// import { getIO } from "../libs/socket";
const AppError_1 = __importDefault(require("../errors/AppError"));
const FindAllInvoiceService_1 = __importDefault(require("../services/InvoicesService/FindAllInvoiceService"));
const ListInvoicesServices_1 = __importDefault(require("../services/InvoicesService/ListInvoicesServices"));
const ShowInvoiceService_1 = __importDefault(require("../services/InvoicesService/ShowInvoiceService"));
const UpdateInvoiceService_1 = __importDefault(require("../services/InvoicesService/UpdateInvoiceService"));
const index = async (req, res) => {
    const { searchParam, pageNumber } = req.query;
    const { invoices, count, hasMore } = await (0, ListInvoicesServices_1.default)({
        searchParam,
        pageNumber
    });
    return res.json({ invoices, count, hasMore });
};
exports.index = index;
const show = async (req, res) => {
    const { Invoiceid } = req.params;
    const invoice = await (0, ShowInvoiceService_1.default)(Invoiceid);
    return res.status(200).json(invoice);
};
exports.show = show;
const list = async (req, res) => {
    const { companyId } = req.user;
    const invoice = await (0, FindAllInvoiceService_1.default)(companyId);
    return res.status(200).json(invoice);
};
exports.list = list;
const update = async (req, res) => {
    const InvoiceData = req.body;
    const schema = Yup.object().shape({
        name: Yup.string()
    });
    try {
        await schema.validate(InvoiceData);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const { id, status } = InvoiceData;
    const plan = await (0, UpdateInvoiceService_1.default)({
        id,
        status,
    });
    // const io = getIO();
    // io.emit("plan", {
    //   action: "update",
    //   plan
    // });
    return res.status(200).json(plan);
};
exports.update = update;
/* export const store = async (req: Request, res: Response): Promise<Response> => {
  const newPlan: StorePlanData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required()
  });

  try {
    await schema.validate(newPlan);
  } catch (err) {
    throw new AppError(err.message);
  }

  const plan = await CreatePlanService(newPlan);

  // const io = getIO();
  // io.emit("plan", {
  //   action: "create",
  //   plan
  // });

  return res.status(200).json(plan);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const plan = await ShowPlanService(id);

  return res.status(200).json(plan);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const planData: UpdateInvoiceData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string()
  });

  try {
    await schema.validate(planData);
  } catch (err) {
    throw new AppError(err.message);
  }

  const { id, name, users, connections, queues, value } = planData;

  const plan = await UpdatePlanService({
    id,
    name,
    users,
    connections,
    queues,
    value
  });

  // const io = getIO();
  // io.emit("plan", {
  //   action: "update",
  //   plan
  // });

  return res.status(200).json(plan);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const plan = await DeletePlanService(id);

  return res.status(200).json(plan);
}; */
