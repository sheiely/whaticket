"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("ChatMessages", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            chatId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Chats", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            senderId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            message: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            mediaPath: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            mediaName: {
                type: sequelize_1.DataTypes.TEXT,
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
        return queryInterface.dropTable("ChatMessages");
    }
};
