const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const todosRouter = require("./routes/todos");

const app = express();

// 设定主机名和端口
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 4000);

// 连接 MongoDB 数据库
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
mongoose.connect(mongoURI);
mongoose.connection.on("open", function() {
  console.log("Mongoose connected.");
});

// 配置 Morgan 日志中间件
const logPath = process.env.LOG_PATH || path.join(__dirname, "access.log");
const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });

app.use(cors());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use(express.json());

// 配置路由
app.get("/", (req, res) => {
  res.json({ success: true });
});
app.use("/todos", todosRouter);

// 打开服务器
app.listen(app.get("port"), app.get("host"), function() {
  console.log(
    `Server is running on http://${app.get("host")}:${app.get("port")}`
  );
});
