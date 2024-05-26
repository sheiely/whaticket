"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("QueueIntegrations", "typebotSlug", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        }),
            queryInterface.addColumn("QueueIntegrations", "typebotExpires", {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }),
            queryInterface.addColumn("QueueIntegrations", "typebotKeywordFinish", {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            }),
            queryInterface.addColumn("QueueIntegrations", "typebotUnknownMessage", {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("QueueIntegrations", "typebotSlug"),
            queryInterface.removeColumn("QueueIntegrations", "typebotExpires"),
            queryInterface.removeColumn("QueueIntegrations", "typebotKeywordFinish"),
            queryInterface.removeColumn("QueueIntegrations", "typebotUnknownMessage");
    }
};
