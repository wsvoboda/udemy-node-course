"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Products", {
      type: "FOREIGN KEY",
      fields: ["userId"],
      references: {
        name: "userid-fk-in-products",
        table: "Users",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Products", "userid-fk-in-products");
  },
};
