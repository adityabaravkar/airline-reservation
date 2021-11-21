const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { update } = require("../../validations/user.validation");
const { checkAuth } = require("../../middlewares/authorization");

router.get("/detail/:userid", checkAuth, userController.detail);
router.post("/update", checkAuth, update, userController.update);

module.exports = router;
