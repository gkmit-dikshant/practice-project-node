const logger = require("../logger");
const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URL });

client
  .connect()
  .then(() => logger.info("redis connected successfully.."))
  .catch((er) => logger.error(er.message));

module.exports = {
  client,
};
