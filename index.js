const express = require("express");
const router = require("./routes");
const { sequelize } = require("./models");
const { client } = require("./config/redis");
const logger = require("./utils/logger");
const responseMiddleware = require("./middlewares/response.middleware");

const app = express();
app.use(express.json());

app.use(logger);
app.use(responseMiddleware);
app.use("/api", router);
app.get("/api/health", async (_req, res) => {
  try {
    const [result] = await sequelize.query("SELECT NOW();");
    const dbTime = result[0]?.now;
    const redisPong = await client.ping();

    res.success({
      uptime: process.uptime(),
      database: dbTime,
      redis: redisPong,
    });
  } catch (error) {
    console.error(error);
    res.error(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
