const { Sequelize } = require("sequelize");
// module.exports = new Sequelize(
//   "postgresql://u8skx1yw9yvmycpsli7u:EKHpJv7gN8lzZBMWl13z@b2gpsl6pp1wibu3mvaox-postgresql.services.clever-cloud.com:6412/b2gpsl6pp1wibu3mvaox"
// );
module.exports = new Sequelize(
  "nodejssequelize-atlp",
  "postgres",
  "81esyvprog17",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
