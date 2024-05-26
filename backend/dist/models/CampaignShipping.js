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
const Campaign_1 = __importDefault(require("./Campaign"));
const ContactListItem_1 = __importDefault(require("./ContactListItem"));
let CampaignShipping = class CampaignShipping extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CampaignShipping.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CampaignShipping.prototype, "jobId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CampaignShipping.prototype, "number", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CampaignShipping.prototype, "message", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CampaignShipping.prototype, "confirmationMessage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], CampaignShipping.prototype, "confirmation", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ContactListItem_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CampaignShipping.prototype, "contactId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Campaign_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CampaignShipping.prototype, "campaignId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], CampaignShipping.prototype, "confirmationRequestedAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], CampaignShipping.prototype, "confirmedAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], CampaignShipping.prototype, "deliveredAt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], CampaignShipping.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], CampaignShipping.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ContactListItem_1.default),
    __metadata("design:type", ContactListItem_1.default)
], CampaignShipping.prototype, "contact", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Campaign_1.default),
    __metadata("design:type", Campaign_1.default)
], CampaignShipping.prototype, "campaign", void 0);
CampaignShipping = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "CampaignShipping" })
], CampaignShipping);
exports.default = CampaignShipping;
