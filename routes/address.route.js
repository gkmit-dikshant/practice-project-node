const express = require("express");
const { addressController } = require("../controllers");
const { addressValidator } = require("../validators");
const router = express.Router();

router.post(
  "/",
  addressValidator.createAddressValidator,
  addressController.createAddress,
);
router.patch(
  "/:addressId",
  addressValidator.updateAddressValidator,
  addressController.updateAddress,
);
router.get("/:addressId", addressController.getAddress);
router.delete("/:addressId", addressController.deleteAddress);

module.exports = router;
