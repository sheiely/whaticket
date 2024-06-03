"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("BulkMessages", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            message: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            ev_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            type: {
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
        return queryInterface.dropTable("BulkMessages");
    }
};
