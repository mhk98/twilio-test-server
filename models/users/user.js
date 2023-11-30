const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const usertbls = sequelize.define(
    "usertbls",
    {
      User_ID: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },

      Name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      Email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        // required: [true, "Email address is required"],
      },
      Password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        enum: ["user", "admin"],
      },
    },

    // Define hooks to perform actions before creating a user
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.Password) {
            const salt = await bcrypt.genSaltSync(10);
            user.Password = bcrypt.hashSync(user.Password, salt);
          }
        },
      },
    }
  );

  // Define custom methods for validating and hashing passwords
  usertbls.prototype.validPassword = async (Password, hash) => {
    return await bcrypt.compareSync(Password, hash);
  };
  usertbls.prototype.getHashPass = async (Password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(Password, salt);
    return hashed;
  };
  return usertbls;
};
