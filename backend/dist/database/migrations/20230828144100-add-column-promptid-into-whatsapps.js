"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = {
    up: async (queryInterface) => {
        const table = "Whatsapps";
        const column = "promptId";
        const tableInfo = await queryInterface.describeTable(table);
        if (tableInfo[column]) {
            return Promise.resolve();
        }
        return queryInterface.addColumn(table, column, {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: "Prompts", key: "id" },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT"
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "promptId");
    }
};
