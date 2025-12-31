const { addressService } = require("../services");
const { addressSerializer } = require("../serializers");

const createAddress = async (req, res) => {
  try {
    const row = await addressService.createAddress(req.body);
    res.success(
      { address: addressSerializer(row) },
      201,
      "address created successfully",
    );
  } catch (error) {
    res.error(error);
  }
};
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    if (isNaN(addressId)) {
      throw { statusCode: 400, message: `invalid address id ${addressId}` };
    }
    const row = await addressService.updateAddress(addressId, req.body);

    res.success(null, 200, "address updated successfully");
  } catch (error) {
    res.error(error);
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    if (isNaN(addressId)) {
      throw { statusCode: 400, message: `invalid address id ${addressId}` };
    }
    await addressService.deleteAddress(addressId);
    res.success(null, 204, "address deleted successfully");
  } catch (error) {
    res.error(error);
  }
};
const getAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    if (isNaN(addressId)) {
      throw { statusCode: 400, message: `invalid address id ${addressId}` };
    }
    const row = await addressService.getAddressById(addressId);
    res.success(
      { address: addressSerializer(row) },
      200,
      "address fetched successfully",
    );
  } catch (error) {
    res.error(error);
  }
};

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddress,
};
