const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { update } = require("../../validations/user.validation");

//@route GET api for users
router.get("/", (req, res) => res.send("route: users"));
router.post("/update", update, userController.update);

module.exports = router;
