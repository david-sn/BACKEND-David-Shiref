module.exports = (sequelize, DataTypes) => {
  const SupportTicket = sequelize.define('support_tickets', {
    message: DataTypes.STRING(255),
    status: DataTypes.ENUM('open', 'pending', 'resolved', 'closed'),
    priority: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true;
      }
    },
    paranoid: true,
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  SupportTicket.associate = (models) =>  {
    SupportTicket.belongsTo(models.users, { foreignKey: 'user_id', onDelete: 'cascade' });
  };

  return SupportTicket;
};
