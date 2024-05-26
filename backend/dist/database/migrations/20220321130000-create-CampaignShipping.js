"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("CampaignShipping", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            jobId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true
            },
            number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            message: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            confirmationMessage: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            confirmation: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true
            },
            contactId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "ContactListItems", key: "id" },
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
                allowNull: true
            },
            campaignId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Campaigns", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            confirmationRequestedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            confirmedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            deliveredAt: {
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
        return queryInterface.dropTable("CampaignShipping");
    }
};
