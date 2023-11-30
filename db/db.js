const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

// Create a new Sequelize instance for database connection
const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,

  // Database connection configuration
  {
    host: "db4free.net",
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false,
    timezone: "+06:00",
    port: 3306,
  }
);

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

// Create an object 'db' to store Sequelize and sequelize instances for export
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
