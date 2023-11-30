module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {

    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Message;
};
