const { sequelize, Sequelize } = require("@/core/db");
var Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    username: Sequelize.STRING(100),
    password: Sequelize.STRING(10),
    realname: Sequelize.STRING(100),
    cost: Sequelize.DECIMAL(19, 4),
  },
  {
    timestamps: false,
  }
);
async function login({ username, password }) {
  var users = await Users.findAll({
    where: {
      username,
    },
  });
  if (users.length > 0) {
    if (users[0].password === password) {
      console.log("password", password);
      return users[0];
    }
  } else {
    return { err: "用户名或密码不正确" };
  }
}
module.exports = {
  login,
};
