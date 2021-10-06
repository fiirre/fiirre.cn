require("module-alias/register");

const Koa = require("koa");
const InitManager = require("./core/init");
const KoaStatic = require("koa-static");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const staticPath = "/fe/dist";

const app = new Koa();
//
app.use(cors());
app.use(bodyParser());
// 配置路径
app.use(KoaStatic(path.join(__dirname, staticPath)));
InitManager.initCore(app);

let page = new Router();

page.get("/", async (ctx) => {
  let filePath = path.join(__dirname, "../fe/dist/index.html");
  console.log(ctx.filePath);
  ctx.set("content-type", "text/html; charset=utf-8");
  ctx.body = fs.readFileSync(filePath);
});
app.use(page.routes()).use(page.allowedMethods());

app.listen(3000);
