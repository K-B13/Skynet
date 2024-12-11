const express = require("express");

const RobotsController = require("../controllers/robot");

const router = express.Router();

router.post("/", RobotsController.createRobot);
router.get("/:id", RobotsController.getRobot);
router.put("/:id/currency", RobotsController.updateRobotCurrency);
router.put("/:id/battery", RobotsController.updateRobotBattery);
router.put("/:id/memory", RobotsController.updateRobotMemory);

module.exports = router;