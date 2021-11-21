const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { create } = require("../../validations/user.validation");

router.post("/register", create, authController.register);
router.post("/login", authController.login);

module.exports = router;
