'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Transactions', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'User trans',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Transactions', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'Product trans',
      references: { //Required field
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Transactions', 'User trans', {})
    await queryInterface.removeConstraint('Transactions', 'Product trans', {})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
