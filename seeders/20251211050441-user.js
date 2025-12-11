"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Dikshant Sharma",
        email: "dikshantsharma2005@gmail.com",
        contact: "9876543210",
      },
      {
        name: "Divya Bagora",
        email: "divyabagora@gmail.com",
        contact: "9876543210",
      },
      {
        name: "Vidit Khandelwal",
        email: "viditkhandelwal@gmail.com",
        contact: "9876543210",
      },
    ];

    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
