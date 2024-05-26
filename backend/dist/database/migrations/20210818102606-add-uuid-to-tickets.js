"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Tickets", "uuid", {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                defaultValue: sequelize_1.Sequelize.literal('uuid_generate_v4()')
            })
        ]);
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Tickets", "uuid");
    }
};
