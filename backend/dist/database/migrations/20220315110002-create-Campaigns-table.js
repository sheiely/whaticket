"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Campaigns", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            message1: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            message2: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            message3: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            message4: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            message5: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            confirmationMessage1: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            confirmationMessage2: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            confirmationMessage3: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            confirmationMessage4: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            confirmationMessage5: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true
            },
            confirmation: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            mediaPath: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            mediaName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            companyId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Companies", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            contactListId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "ContactLists", key: "id" },
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
                allowNull: true
            },
            whatsappId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Whatsapps", key: "id" },
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
                allowNull: true
            },
            scheduledAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            completedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Campaigns");
    }
};
