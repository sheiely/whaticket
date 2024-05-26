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
const User_1 = __importDefault(require("./User"));
const UserQueue_1 = __importDefault(require("./UserQueue"));
const Company_1 = __importDefault(require("./Company"));
const Whatsapp_1 = __importDefault(require("./Whatsapp"));
const WhatsappQueue_1 = __importDefault(require("./WhatsappQueue"));
const QueueOption_1 = __importDefault(require("./QueueOption"));
const Prompt_1 = __importDefault(require("./Prompt"));
const QueueIntegrations_1 = __importDefault(require("./QueueIntegrations"));
let Queue = class Queue extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "color", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(""),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "greetingMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(""),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "outOfHoursMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB
    }),
    __metadata("design:type", Array)
], Queue.prototype, "schedules", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Queue.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Queue.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_1.default),
    __metadata("design:type", Company_1.default)
], Queue.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Whatsapp_1.default, () => WhatsappQueue_1.default),
    __metadata("design:type", Array)
], Queue.prototype, "whatsapps", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => UserQueue_1.default),
    __metadata("design:type", Array)
], Queue.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => QueueOption_1.default, {
        onDelete: "DELETE",
        onUpdate: "DELETE",
        hooks: true
    }),
    __metadata("design:type", Array)
], Queue.prototype, "options", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "orderQueue", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => QueueIntegrations_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "integrationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => QueueIntegrations_1.default),
    __metadata("design:type", QueueIntegrations_1.default)
], Queue.prototype, "queueIntegrations", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Prompt_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "promptId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Prompt_1.default),
    __metadata("design:type", Prompt_1.default)
], Queue.prototype, "prompt", void 0);
Queue = __decorate([
    sequelize_typescript_1.Table
], Queue);
exports.default = Queue;
