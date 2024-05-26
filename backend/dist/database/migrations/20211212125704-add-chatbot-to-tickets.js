"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Tickets", "chatbot", {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            }),
            queryInterface.addColumn("Tickets", "queueOptionId", {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "QueueOptions", key: "id" },
                onUpdate: "SET null",
                onDelete: "SET null",
                allowNull: true
            })
        ]);
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Tickets", "chatbot");
    }
};
