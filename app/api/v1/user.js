const Router = require("koa-router");

const { login } = require("@app/models/user.js");

const router = new Router({
  prefix: "/api/v1/user",
});

// 管理员登录
router.post("/login", async (ctx) => {
  // 校验用户名和密码是否符合规则
  console.log(ctx.request.body);
  const { err, username } = await login({
    username: ctx.request.body.userName,
    password: ctx.request.body.password,
  });
  if (!err) {
    ctx.body = { username };
  } else {
    ctx.body = { err };
  }

  //   if (!err) {
  //     let [err, data] = await UserDao.detail(id);
  //     if (!err) {
  //       data.setDataValue("token", token);
  //       ctx.response.status = 200;
  //       ctx.body = res.json(data);
  //     }
  //   } else {
  //     ctx.body = res.fail(err, err.msg);
  //   }
});

module.exports = router;
