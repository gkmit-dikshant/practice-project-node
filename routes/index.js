const express = require("express");
const { urlValidator } = require("../validators");
const userRoute = require("./user.route");
const addressRoute = require("./address.route");
const router = express.Router();

router.use(urlValidator.paginationValidation);
router.use("/users", userRoute);
router.use("/addresses", addressRoute);
module.exports = router;
