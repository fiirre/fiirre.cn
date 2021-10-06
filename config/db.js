const evn = process.env.NODE_ENV; // 环境参数

let MYSQL_CONF;
let REDIS_CONF;

if (evn === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root123",
    port: "3306",
    database: "myblog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "localhost",
  };
}
if (evn === "production") {
  MYSQL_CONF = {
    host: "94.191.117.00",
    user: "root",
    password: "root",
    port: "3306",
    database: "myblog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "localhost",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
