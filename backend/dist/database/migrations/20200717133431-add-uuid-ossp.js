"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
        ]);
    },
};
