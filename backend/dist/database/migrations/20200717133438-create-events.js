"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Events", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
            },
            situation: {
                type: sequelize_1.DataTypes.STRING
            },
            city: {
                type: sequelize_1.DataTypes.STRING
            },
            uf: {
                type: sequelize_1.DataTypes.STRING
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Events");
    }
};
