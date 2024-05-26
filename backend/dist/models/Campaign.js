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
const CampaignShipping_1 = __importDefault(require("./CampaignShipping"));
const Company_1 = __importDefault(require("./Company"));
const ContactList_1 = __importDefault(require("./ContactList"));
const Whatsapp_1 = __importDefault(require("./Whatsapp"));
const Files_1 = __importDefault(require("./Files"));
let Campaign = class Campaign extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "message1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "message2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "message3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "message4", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "message5", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "confirmationMessage1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "confirmationMessage2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "confirmationMessage3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "confirmationMessage4", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Campaign.prototype, "confirmationMessage5", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "INATIVA" }),
    __metadata("design:type", String)
], Campaign.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Campaign.prototype, "confirmation", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Campaign.prototype, "mediaPath", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Campaign.prototype, "mediaName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Campaign.prototype, "scheduledAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Campaign.prototype, "completedAt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Campaign.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Campaign.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Campaign.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_1.default),
    __metadata("design:type", Company_1.default)
], Campaign.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ContactList_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Campaign.prototype, "contactListId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ContactList_1.default),
    __metadata("design:type", ContactList_1.default)
], Campaign.prototype, "contactList", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Whatsapp_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Campaign.prototype, "whatsappId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Whatsapp_1.default),
    __metadata("design:type", Whatsapp_1.default)
], Campaign.prototype, "whatsapp", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Files_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Campaign.prototype, "fileListId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Files_1.default),
    __metadata("design:type", Files_1.default)
], Campaign.prototype, "fileList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CampaignShipping_1.default),
    __metadata("design:type", Array)
], Campaign.prototype, "shipping", void 0);
Campaign = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Campaigns" })
], Campaign);
exports.default = Campaign;
