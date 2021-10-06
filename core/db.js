const Sequelize = require("sequelize");
const { database, host, port, user, password } =
  require("../config/db").MYSQL_CONF;

var sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  timezone: "+08:00",
  port,
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
});

module.exports = {
  sequelize,
  Sequelize,
};
