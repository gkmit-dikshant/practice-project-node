const express = require("express");
const router = require("./routes");
const { sequelize } = require("./models");
const { client } = require("./config/redis");
const httpLogger = require("./logger/httpLogger");
const responseMiddleware = require("./middlewares/response.middleware");
const logger = require("./logger");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  next();
});

app.use(httpLogger);
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
    logger.error("Health check fails");
    res.error(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`server is running at ${PORT}`);
});
