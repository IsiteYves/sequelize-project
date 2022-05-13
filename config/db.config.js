const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  "nodejssequelize-atlp",
  "postgres",
  "81esyvprog17",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
