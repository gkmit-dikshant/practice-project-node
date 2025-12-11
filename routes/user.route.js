const express = require("express");
const { userController } = require("../controllers");
const { userValidator } = require("../validators");
const router = express.Router();

router.patch(
  "/:userId",
  userValidator.updateUserValidation,
  userController.updateUser,
);
router.delete("/:userId", userController.deleteUser);
router.get("/:userId", userController.getUser);
router.get("/:userId/address", userController.getUserAddress);
router.post("/", userValidator.createUserVadiation, userController.createUser);
router.get("/", userController.getAllUsers);

module.exports = router;
