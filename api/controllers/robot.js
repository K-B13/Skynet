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
        
        const singleRobot = await Robot.findOne({userId: loggedInUser})
        
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
            await singleRobot.save();
        }
        else{
            singleRobot.currency = newCurrency
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message:"robot currency updated"});

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
            await singleRobot.save();
        }
        else if(newBattery > 100){
            singleRobot.batteryLife = 100
            console.log("battery full")
            await singleRobot.save();
        }
        else{
            singleRobot.batteryLife = newBattery
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message: "robot battery updated"});

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
        await singleRobot.save()
        res.status(200).json({robot: singleRobot, message: "Robot memory upgraded"});

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
        const randomNumber = Math.floor(Math.random() * 10);
        
        if(randomNumber <=8){
            
            if(newIntelligence > singleRobot.memoryCapacity){
                singleRobot.intelligence = singleRobot.memoryCapacity
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
            else{
                singleRobot.intelligence = newIntelligence
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
        }
        else if(randomNumber >8){
            return res.status(200).json({robot: singleRobot, message: "Robot intelligence did not increase"});
        }


    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot intelligence"});
    };
};

async function updateRobotHardware(req, res) {

    try{
        const robotId = req.params.id
        const newHardwareAmount = req.body.hardwareChange
        
        const singleRobot = await Robot.findById(robotId)
        newHardware = singleRobot.hardware += newHardwareAmount
        
        if(newHardware <= 0){
            singleRobot.hardware = 0
            singleRobot.isAlive = false
            await singleRobot.save();
        }
        else{
            singleRobot.hardware = newHardware;
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message:"robot hardware updated"});

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

async function killRobot(req, res){
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId);

        singleRobot.isAlive = false;
        await singleRobot.save();
        
        res.status(200).json({robot: singleRobot, message: "killed robot"});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to kill robot"});
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
            else if (!deleteRobot) {
                return res.status(404).json({ message: 'Robot not found or already deleted' });
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
    killRobot: killRobot,
    deleteRobot: deleteRobot,
    getRobotByUserId: getRobotByUserId
};

module.exports = RobotsController;