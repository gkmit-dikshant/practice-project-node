const { User, UserAddress, sequelize } = require("../models");
const cache = require("../helper/redis.helper");
const pagination = require("../utils/pagination");

const createUser = async (data) => {
  try {
    const newUser = await User.create(data);
    await cache.clear("USERS");
    return newUser;
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      throw {
        statusCode: 409,
        message: `user with email ${data.email} already exists`,
      };
    }
    throw error;
  }
};

const updateUser = async (userId, data) => {
  try {
    const existing = await getUserById(userId);
    if (!existing) {
      throw {
        statusCode: 404,
        message: `user with id: ${userId} doesn't exist`,
      };
    }
    const updatedUser = await User.update(data, {
      where: { id: userId },
      returning: true,
    });
    await cache.clear("USERS");
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  const existing = await getUserById(userId);
  if (!existing) {
    throw {
      statusCode: 404,
      message: `user with id: ${userId} doesn't exist`,
    };
  }
  const t = await sequelize.transaction();
  try {
    await User.destroy({ where: { id: userId } }, { transaction: t });
    await UserAddress.destroy(
      { where: { user_id: userId } },
      { transaction: t },
    );

    await t.commit();
    await cache.clear("USERS");
    return null;
  } catch (error) {
    t.rollback();
    throw error;
  }
};

const getAllUser = async (
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "-1",
) => {
  try {
    const cacheKey = `USERS_ALL?PAGE=${page}&LIMIT=${limit}&SORT=${sort}`;
    const cachedData = await cache.getter(cacheKey);
    if (cachedData?.length) {
      return cachedData;
    }
    const offset = (page - 1) * limit;
    const orderBy = order === "-1" ? "DESC" : "ASC";
    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [[sort, orderBy]],
      raw: true,
    });
    const pageDetails = pagination(page, users?.length, limit, count);
    // set cache
    await cache.setter(cacheKey, { users, pageDetails });
    return { users, pageDetails };
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const cacheKey = `USERS_?ID=${userId}`;
    const cachedData = await cache.getter(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw {
        statusCode: 404,
        message: `user with id: ${userId} doesn't exist`,
      };
    }
    await cache.setter(cacheKey, user);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
};
