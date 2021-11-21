const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { update } = require("../../validations/user.validation");

router.get("/detail/:userid", userController.detail);
router.post("/update", update, userController.update);

module.exports = router;
