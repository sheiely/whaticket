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
const uuid_1 = require("uuid");
const ChatMessage_1 = __importDefault(require("./ChatMessage"));
const ChatUser_1 = __importDefault(require("./ChatUser"));
const Company_1 = __importDefault(require("./Company"));
const User_1 = __importDefault(require("./User"));
let Chat = class Chat extends sequelize_typescript_1.Model {
    static setUUID(chat) {
        chat.uuid = (0, uuid_1.v4)();
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)((0, uuid_1.v4)()),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Chat.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chat.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: "" }),
    __metadata("design:type", String)
], Chat.prototype, "lastMessage", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Company_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chat.prototype, "companyId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Chat.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Chat.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Company_1.default),
    __metadata("design:type", Company_1.default)
], Chat.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default),
    __metadata("design:type", User_1.default)
], Chat.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ChatUser_1.default),
    __metadata("design:type", Array)
], Chat.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ChatMessage_1.default),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Chat]),
    __metadata("design:returntype", void 0)
], Chat, "setUUID", null);
Chat = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Chats" })
], Chat);
exports.default = Chat;
