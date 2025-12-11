const { UserAddress } = require("../models");
const { userService } = require("../services");
const cache = require("../helper/redis.helper");
const pagination = require("../utils/pagination");

const createAddress = async (data) => {
  try {
    const existUser = await userService.getUserById(data.user_id);
    if (!existUser) {
      throw {
        statusCode: 404,
        message: `user with id: ${userId} doesn't exist`,
      };
    }
    await cache.clear("ADDRESS");

    const newAddress = await UserAddress.create(data);
    return newAddress;
  } catch (error) {
    throw error;
  }
};

const updateAddress = async (addressId, data) => {
  try {
    const existing = await getAddressById(addressId);
    if (!existing) {
      throw { statusCode: 404, message: `address with id: ${addressId}` };
    }
    const updatedAddress = await UserAddress.update(data, {
      where: { id: addressId },
    });

    await cache.clear("ADDRESS");

    return updatedAddress;
  } catch (error) {
    throw error;
  }
};

const deleteAddress = async (addressId) => {
  try {
    const existing = await getAddressById(addressId);
    if (!existing) {
      throw { statusCode: 404, message: `address with id: ${addressId}` };
    }
    await UserAddress.destroy({ where: { id: addressId } });
    await cache.clear("ADDRESS");

    return null;
  } catch (error) {
    throw error;
  }
};

const getAllUserAddress = async (
  userId,
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "-1",
) => {
  try {
    const existUser = await userService.getUserById(userId);
    if (!existUser) {
      throw {
        statusCode: 404,
        message: `user with id: ${userId} doesn't exist`,
      };
    }
    const cacheKey = `ADDRESS/${userId}?PAGE=${page}&LIMIT=${limit}&SORT=${sort}`;
    const cachedData = await cache.getter(cacheKey);
    if (cachedData?.length) {
      return cachedData;
    }
    const offset = (page - 1) * limit;
    const orderBy = order === "-1" ? "DESC" : "ASC";
    const { count, rows: addresses } = await UserAddress.findAndCountAll({
      where: { user_id: userId },
      order: [[sort, orderBy]],

      limit,
      offset,
    });
    const pageDetails = pagination(page, addresses?.length, limit, count);
    await cache.setter(cacheKey, { addresses, pageDetails });
    return { addresses, pageDetails };
  } catch (error) {
    throw error;
  }
};

const getAddressById = async (addressId) => {
  try {
    const cacheKey = `ADDRESS/${addressId}`;
    const cachedData = await cache.getter(cacheKey);
    if (cachedData?.length) {
      return cachedData;
    }
    const address = await UserAddress.findByPk(addressId);
    if (!address) {
      throw { statusCode: 404, message: `address with id: ${addressId}` };
    }
    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAllUserAddress,
  getAddressById,
};
