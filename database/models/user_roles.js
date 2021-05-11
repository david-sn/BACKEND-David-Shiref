module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('user_roles', {
    
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

  UserRoles.associate = (models) =>  {
    UserRoles.belongsTo(models.roles, { foreignKey: 'role_id', onDelete: 'cascade' });
    UserRoles.belongsTo(models.users, { foreignKey: 'user_id', onDelete: 'cascade' });
    // UserRoles.hasMany(models.user_roles);
  };

  return UserRoles;
};
