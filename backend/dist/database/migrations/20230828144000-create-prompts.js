"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface) => {
        const table = "Prompts";
        const existingTables = await queryInterface.showAllTables();
        if (!existingTables.includes(table)) {
            return queryInterface.createTable(table, {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false
                },
                apiKey: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false
                },
                prompt: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false
                },
                maxTokens: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 100
                },
                maxMessages: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 10
                },
                temperature: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1
                },
                promptTokens: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                completionTokens: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                totalTokens: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                voice: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: true
                },
                voiceKey: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: true
                },
                voiceRegion: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: true
                },
                queueId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: { model: "Queues", key: "id" },
                    onUpdate: "NO ACTION",
                    onDelete: "NO ACTION",
                    allowNull: false
                },
                companyId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: { model: "Companies", key: "id" },
                    onUpdate: "NO ACTION",
                    onDelete: "NO ACTION",
                    allowNull: false
                },
                createdAt: {
                    type: sequelize_1.DataTypes.DATE(6),
                    allowNull: false
                },
                updatedAt: {
                    type: sequelize_1.DataTypes.DATE(6),
                    allowNull: false
                }
            });
        }
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Prompts");
    }
};
