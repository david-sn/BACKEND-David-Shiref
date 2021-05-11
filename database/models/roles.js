module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    name: DataTypes.STRING(255),
    description: DataTypes.STRING(255),
    status: DataTypes.ENUM('active', 'inactive'),
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

  Roles.associate = (models) =>  {
    Roles.hasMany(models.user_roles);
  };

  return Roles;
};
