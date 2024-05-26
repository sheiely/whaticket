"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Subscriptions", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
            expiresAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            userPriceCents: {
                type: sequelize_1.DataTypes.INTEGER
            },
            whatsPriceCents: {
                type: sequelize_1.DataTypes.INTEGER
            },
            lastInvoiceUrl: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true
            },
            lastPlanChange: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            companyId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Companies", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            providerSubscriptionId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
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
        return queryInterface.dropTable("Subscriptions");
    }
};
