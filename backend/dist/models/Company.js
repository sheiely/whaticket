"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Contact_1 = __importDefault(require("./Contact"));
const Message_1 = __importDefault(require("./Message"));
const Plan_1 = __importDefault(require("./Plan"));
const Queue_1 = __importDefault(require("./Queue"));
const Setting_1 = __importDefault(require("./Setting"));
const Ticket_1 = __importDefault(require("./Ticket"));
const TicketTraking_1 = __importDefault(require("./TicketTraking"));
const User_1 = __importDefault(require("./User"));
const UserRating_1 = __importDefault(require("./UserRating"));
const Whatsapp_1 = __importDefault(require("./Whatsapp"));
let Company = class Company extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Company.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Company.prototype, "dueDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Company.prototype, "recurrence", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB
    }),
    __metadata("design:type", Array)
], Company.prototype, "schedules", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Plan_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Company.prototype, "planId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Plan_1.default),
    __metadata("design:type", Plan_1.default)
], Company.prototype, "plan", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => User_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => UserRating_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "userRatings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Queue_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "queues", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Whatsapp_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "whatsapps", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Message_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Contact_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "contacts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Setting_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "settings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Ticket_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "tickets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => TicketTraking_1.default, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Company.prototype, "ticketTrankins", void 0);
Company = __decorate([
    sequelize_typescript_1.Table
], Company);
exports.default = Company;
