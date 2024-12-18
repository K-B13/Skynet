const express = require("express");

const RobotsController = require("../controllers/robot");

const router = express.Router();

router.post("/", RobotsController.createRobot);
router.get('/:id/speach', RobotsController.robotSpeach)
router.get("/:id", RobotsController.getRobotByUserId);
router.put("/:id/currency", RobotsController.updateRobotCurrency);
router.put("/:id/battery", RobotsController.updateRobotBattery);
router.put("/:id/memory", RobotsController.updateRobotMemory);
router.put("/:id/intelligence", RobotsController.updateRobotIntelligence);
router.put("/:id/hardware", RobotsController.updateRobotHardware);
router.put("/:id/killrobot", RobotsController.killRobot);
router.delete("/:id", RobotsController.deleteRobot);
router.put("/:id/changestats", RobotsController.changeStatsOnLogin);
router.put("/:id/lowerbattery", RobotsController.lowerRobotBattery);


module.exports = router;