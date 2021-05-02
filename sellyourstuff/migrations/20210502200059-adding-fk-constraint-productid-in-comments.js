"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Comments", {
      type: "FOREIGN KEY",
      fields: ["productId"],
      references: {
        name: "productid-fk-in-comments",
        table: "Products",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Comments",
      "productid-fk-in-comments"
    );
  },
};
