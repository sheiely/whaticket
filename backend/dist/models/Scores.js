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
const Event_1 = __importDefault(require("./Events"));
let Scores = class Scores extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "id", void 0);

__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Event_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "event", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Event_1.default),
    __metadata("design:type", Event_1.default)
], Scores.prototype, "eventObject", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "number", void 0);


__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "name", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "gender", void 0);



__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "cpf", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Scores.prototype, "liquid_time", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Scores.prototype, "time_raw", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Scores.prototype, "time_determined", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "turns", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "gender_placement", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "general_placement", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "principal_placement", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "secundary_placement", void 0);


__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "pace", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "distance", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Scores.prototype, "trial", void 0);

__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Scores.prototype, "trial_cod", void 0);


__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Scores.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Scores.prototype, "updatedAt", void 0);

Scores = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Scores"
    })
], Scores);
exports.default = Scores;
