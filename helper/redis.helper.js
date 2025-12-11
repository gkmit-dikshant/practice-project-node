const { client } = require("../config/redis");

const redisTtl = parseInt(process.env.REDIS_TTL) || 3600;
const getter = async (key) => {
  try {
    const data = await client.get(key);

    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const setter = async (key, data) => {
  try {
    await client.set(key, JSON.stringify(data), { EX: redisTtl });
  } catch (error) {
    throw error;
  }
};

const clear = async (keyStart) => {
  try {
    const keys = await client.keys(`${keyStart}*`);
    if (keys?.length) {
      await client.del(...keys);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getter,
  setter,
  clear,
};
