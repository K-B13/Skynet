const express = require("express");

const RobotsController = require("../controllers/robot");

const router = express.Router();

router.post("/", RobotsController.createRobot);

module.exports = router;