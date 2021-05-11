module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING(300),
    first_name: DataTypes.STRING(300),
    last_name: DataTypes.STRING(300),
    password_hash: DataTypes.STRING(300),
    password_salt: DataTypes.STRING(300),
    status: DataTypes.ENUM('active', 'inactive'),
    last_login: DataTypes.DATE,
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

  Users.associate = (models) =>  {
    Users.hasMany(models.user_roles);
  };

  return Users;
};
