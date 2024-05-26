"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface) => {
        return queryInterface.removeConstraint("Tickets", "contactid_companyid_unique"),
            queryInterface.addConstraint("Tickets", ["contactId", "companyId", "whatsappId"], {
                type: "unique",
                name: "contactid_companyid_unique"
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeConstraint("Tickets", "contactid_companyid_unique");
    }
};
