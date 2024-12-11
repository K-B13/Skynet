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
        res.status(201).json({message: "Robot created"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Robot creation failed"});
    };
};

// async function getRobot(req, res) {
//     try{
//         const robotId = req.params.id
//         const singleRobot = await Robot.findById(robotId)
//         res.status(200).json({robot: singleRobot});

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({message: "Failed to get robot"});
//     };
// };

async function getRobotByUserId(req, res) {
    try{
        const loggedInUser = req.params.id
        console.log("USER ID CONTROLLER: ", loggedInUser);
        
        const singleRobot = await Robot.findOne({userId: loggedInUser})
        console.log("ROBOT RETURNED: ", singleRobot);
        
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

async function updateRobotMood(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        if(typeof req.body.mood === 'string'){
            singleRobot.mood = req.body.mood

        }
        else{
        return res.status(400).json({message: "Mood must be a string!!"});
        }

        
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot mood"});
    };
};

async function deleteRobot(req, res) {
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        
        if (singleRobot.isAlive === false){
            const deleteRobot = await Robot.findByIdAndDelete(robotId)
            if(deleteRobot){
                return res.status(200).json({message: "Robot deleted"});
            }
        }
        else{
            return res.status(400).json({message: "Robot is not dead!"});
        }

        

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to delete robot"});
    };
};

const RobotsController = {
    createRobot: createRobot,
    // getRobot: getRobot,
    updateRobotCurrency: updateRobotCurrency,
    updateRobotBattery: updateRobotBattery,
    updateRobotMemory: updateRobotMemory,
    updateRobotIntelligence: updateRobotIntelligence,
    updateRobotHardware: updateRobotHardware,
    updateRobotMood: updateRobotMood,
    deleteRobot: deleteRobot,
    getRobotByUserId: getRobotByUserId
};

module.exports = RobotsController;