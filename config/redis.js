const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URL });

client
  .connect()
  .then(() => console.log("redis connected successfully.."))
  .catch((er) => console.error(er.message));

module.exports = {
  client,
};
