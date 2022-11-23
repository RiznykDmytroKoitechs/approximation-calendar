var { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./main.db",
});

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [5, 20],
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [5, 20],
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
      },
      allowNull: false,
    },
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
