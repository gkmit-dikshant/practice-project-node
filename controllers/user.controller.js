const { userService, addressService } = require("../services");
const { userSerializer, addressSerializer } = require("../serializers");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.success(
      { user: userSerializer(user) },
      201,
      "user created successfully",
    );
  } catch (error) {
    res.error(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      throw { statusCode: 400, message: `invalid userId ${userId}` };
    }
    const user = await userService.updateUser(userId, req.body);
    res.success(null, 200, "user updated successfully");
  } catch (error) {
    res.error(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      throw { statusCode: 400, message: `invalid userId ${userId}` };
    }
    await userService.deleteUser(userId);
    res.success(null, 204, "user deleted successfully");
  } catch (error) {
    res.error(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { page, limit, sort, order } = req.query;
    const { users, pageDetails } = await userService.getAllUser(
      page,
      limit,
      sort,
      order,
    );

    res.success(
      { users: userSerializer(users), ...pageDetails },
      200,
      "user fetched successfully",
    );
  } catch (error) {
    res.error(error);
  }
};
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      throw { statusCode: 400, message: `invalid userId ${userId}` };
    }
    const user = await userService.getUserById(userId);
    res.success(
      { user: userSerializer(user) },
      200,
      "user fetched successfully",
    );
  } catch (error) {
    res.error(error);
  }
};

const getUserAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      throw { statusCode: 400, message: `invalid userId ${userId}` };
    }
    const { page, limit, sort, order } = req.query;
    const { addresses, pageDetails } = await addressService.getAllUserAddress(
      userId,
      page,
      limit,
      sort,
      order,
    );
    res.success(
      { addresses: addressSerializer(addresses), ...pageDetails },
      200,
      "addresses fetched successfully",
    );
  } catch (error) {
    res.error(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserAddress,
};
