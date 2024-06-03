"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Scores", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            event: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Events", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                allowNull: false
            },
            trial: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            trial_cod: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            number: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            cpf: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            liquid_time: {
                type: 'TIMESTAMP WITHOUT TIME ZONE',
                allowNull: false
            },
            time_raw: {
                type: 'TIMESTAMP WITHOUT TIME ZONE',
                allowNull: false
            },
            time_determined: {
                type: 'TIMESTAMP WITHOUT TIME ZONE',
                allowNull: false
            },
            turns: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            gender_placement: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            general_placement: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            principal_placement: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            secundary_placement: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            pace: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            distance: {
                type: sequelize_1.DataTypes.INTEGER,
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
        return queryInterface.dropTable("Scores");
    }
};
