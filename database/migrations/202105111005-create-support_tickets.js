module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('support_tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['open','pending','resolved','closed'],
        allowNull: false,
        defaultValue: 'open'
      },
      priority: {
        type: Sequelize.ENUM,
        values: ['low','medium','high','urgent'],
        allowNull: false,
        defaultValue: 'low'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }, 
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('support_tickets', {});
  }
};
