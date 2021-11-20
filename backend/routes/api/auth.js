const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { create } = require("../../validations/user.validation");

//@route GET api for users
router.get("/", (req, res) => res.send("route: auth"));
router.post("/register", create, authController.register);

module.exports = router;
