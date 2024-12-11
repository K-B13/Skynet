const Robot = require("../models/robot");

async function createRobot(req, res) {
    
    try{
        const name = req.body.name;
        const likes = req.body.likes;
        const dislikes = req.body.dislikes;
        const userId = req.body.userId;

        const robot = new Robot({
            name, likes, dislikes, userId
        });

        await robot.save()
        console.log("Robot created");
        res.status(201).json({message: "Robot created"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Robot creation failed"});
    };
};

async function getRobot(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Failed to get robot"});
    };
};

async function updateRobotCurrency(req, res) {
    try{
        const robotId = req.params.id
        const newAmount = req.body.currency
        
        const singleRobot = await Robot.findById(robotId)
        newCurrency = singleRobot.currency += newAmount
        
        if(newCurrency <=0){
            singleRobot.currency = 0
        }
        else{
            singleRobot.currency = newCurrency
        }
        console.log("RETURNED ROBOT: ", singleRobot);
        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot currency"});
    };
};

async function updateRobotBattery(req, res) {
    try{
        const robotId = req.params.id
        const newBatteryLife = req.body.batteryLife
        const singleRobot = await Robot.findById(robotId)
        newBattery = singleRobot.batteryLife += newBatteryLife
        
        if(newBattery <=0){
            singleRobot.batteryLife = 0
            singleRobot.isAlive = false
        }
        else{
            singleRobot.batteryLife = newBattery
        }
        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot battery life"});
    };
};

async function updateRobotMemory(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        singleRobot.memoryCapacity = singleRobot.memoryCapacity * 2
        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot memory"});
    };
};

async function updateRobotIntelligence(req, res) {
    try{
        const robotId = req.params.id
        const brain = req.body.intelligence
        const singleRobot = await Robot.findById(robotId)

        newIntelligence = singleRobot.intelligence += brain

        if(newIntelligence > singleRobot.memoryCapacity){
            singleRobot.intelligence = singleRobot.memoryCapacity
        }
        else{
            singleRobot.intelligence = newIntelligence
        }

        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot memory"});
    };
};

async function updateRobotHardware(req, res) {
    try{
        const robotId = req.params.id
        const newHardwareAmount = req.body.hardware
        const singleRobot = await Robot.findById(robotId)
        newHardware = singleRobot.hardware += newHardwareAmount
        
        if(newHardware <=0){
            singleRobot.hardware = 0
            singleRobot.isAlive = false
        }
        else{
            singleRobot.hardware = newHardware
        }
        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot hardware"});
    };
};

const RobotsController = {
    createRobot: createRobot,
    getRobot: getRobot,
    updateRobotCurrency: updateRobotCurrency,
    updateRobotBattery: updateRobotBattery,
    updateRobotMemory: updateRobotMemory,
    updateRobotIntelligence: updateRobotIntelligence,
    updateRobotHardware: updateRobotHardware
};

module.exports = RobotsController;