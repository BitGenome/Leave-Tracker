/* eslint-disable @typescript-eslint/no-unused-vars */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('LeaveBalances', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      employee_id: {
        type: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      leavetype_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'LeaveCategories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      balance: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('LeaveBalances');
  },
};
