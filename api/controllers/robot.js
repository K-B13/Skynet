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
        if(singleRobot.batteryLife === 100) {
            return res.status(200).json({ message: "Robot already fully charged" });
        }
        if(newCurrency < 0){
            res.status(200).json({ message:"Insufficient funds" });
        }
        else{
            singleRobot.currency = newCurrency
            await singleRobot.save();
            res.status(200).json({robot: singleRobot, message:"robot currency updated"});
        }
        

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
            singleRobot.isAlive = false;
            singleRobot.image = "/deadRobot.png"
            await singleRobot.save();
        }
        else if(newBattery > 100){
            singleRobot.batteryLife = 100
            console.log("battery full")
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();
        }
        else{
            singleRobot.batteryLife = newBattery
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
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
        
        if (singleRobot.currency - 200 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        }
        if (singleRobot.memoryCapacity * 2 > 4096) {
            return res.status(200).json({ message: "Memory at max" });
        }

        singleRobot.memoryCapacity = singleRobot.memoryCapacity * 2
        await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
        singleRobot.currency = singleRobot.currency -= 200
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

        if (singleRobot.currency - 30 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        } else if (singleRobot.intelligence === singleRobot.memoryCapacity) {
            return res.status(200).json({ message: "Insufficient memory storage" });
        }

        const randomNumber = Math.floor(Math.random() * 10);
        singleRobot.currency = singleRobot.currency -=30
        
        if(randomNumber <=8){
            newIntelligence = singleRobot.intelligence += brain
            
            if(newIntelligence > singleRobot.memoryCapacity){
                
                singleRobot.intelligence = singleRobot.memoryCapacity
                await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
            else{
                singleRobot.intelligence = newIntelligence
                await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "Robot intelligence increased"});
            }
        }
        else if(randomNumber > 8){
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
        if (singleRobot.currency - 50 < 0) {
            return res.status(200).json({ message:"Insufficient funds" });
        } else if (singleRobot.hardware === 100) {
            return res.status(200).json({ message:"Already fully repaired" });
        }
        singleRobot.currency = singleRobot.currency -=50
        newHardware = singleRobot.hardware += newHardwareAmount
        

        if(newHardware <= 0){
            singleRobot.hardware = 0
            singleRobot.isAlive = false;
            singleRobot.image = "/deadRobot.png"
            await singleRobot.save();
        }
        else if (newHardware >100){
            singleRobot.hardware = 100
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save()
        }
        else{
            singleRobot.hardware = newHardware;
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();
        }
        
        res.status(200).json({robot: singleRobot, message:"robot hardware updated"});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot hardware"});
    };
};

function updateRobotMood(robot, mood) {
    try{
        if(typeof mood === 'string'){
            robot.mood = mood

            if(mood === "Sad"){
                robot.image = "/Sadanim.gif"
            } else if (mood === "Happy"){
                robot.image = "/Happyanim.gif"
            } else if (mood === "Neutral"){
                robot.image = "/Neutralanim.gif"
            }
        } else {
            return "Mood must be a string!";
        }

        return robot;

    } catch (err) {
        console.log(err);
        return "Failed to update robot mood";
    };
};

async function killRobot(req, res){
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId);

        singleRobot.isAlive = false;
        singleRobot.image = "/deadRobot.png"
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

async function changeStatsOnLogin(req, res) {
    const randomBattery = Math.floor(Math.random() * 10);
    const randomHardware = Math.floor(Math.random() * 10);
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        if(randomBattery <=2){
            singleRobot.batteryLife = singleRobot.batteryLife -= 10
        }
        else if(randomBattery >2 && randomBattery <=6){
            singleRobot.batteryLife = singleRobot.batteryLife -= 5
        }
        else if(randomBattery >6){
            singleRobot.batteryLife = singleRobot.batteryLife -= 2
        }
        if(randomHardware <=2){
            singleRobot.hardware = singleRobot.hardware -= 15
        }
        else if(randomHardware >2 && randomHardware <=6){
            singleRobot.hardware = singleRobot.hardware -= 5
        }
        else if(randomHardware >6){
            singleRobot.hardware = singleRobot.hardware -= 2
        }
        singleRobot.currency = singleRobot.currency += 100

        const battery = singleRobot.batteryLife
        const hardware = singleRobot.hardware
        await changeRobotMood(singleRobot, battery, hardware)
        await singleRobot.save()
        return res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to update robot stats"});
    };
};

async function lowerRobotBattery(req, res) {  
    try{
        const robotId = req.params.id
        const singleRobot = await Robot.findById(robotId)
        newBattery = singleRobot.batteryLife -= 5
        
        if(newBattery <=0){
            singleRobot.batteryLife = 0
            singleRobot.isAlive = false
            await singleRobot.save();
            return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
        }
        else{
            if(newBattery <=30 && singleRobot.hardware <50){
                updateRobotMood(singleRobot, "Sad")
                singleRobot.batteryLife = newBattery
                await singleRobot.save()
                return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
            }
            else if(singleRobot.hardware >=50){
                if(newBattery >=70){
                    updateRobotMood(singleRobot, "Happy")
                    singleRobot.batteryLife = newBattery
                    await singleRobot.save()
                    return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
                }
                else if(newBattery <70){
                    updateRobotMood(singleRobot, "Neutral")
                    singleRobot.batteryLife = newBattery
                    await singleRobot.save()
                    return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
                }
            }
            singleRobot.batteryLife = newBattery
            await changeRobotMood(singleRobot, singleRobot.batteryLife, singleRobot.hardware)
            await singleRobot.save();     
            return res.status(200).json({robot: singleRobot, message: "robot battery lowered"});
        }
        

    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Failed to lower robot battery life"});
    };
};

const changeRobotMood = async (robot, battery, hardware) => {
    if (battery <= 30) {
        await updateRobotMood(robot, "Sad");
    } else if(battery < 70) {
        if (hardware <= 30) {
            await updateRobotMood(robot, "Sad");
        } else if (hardware <= 70) {
            await updateRobotMood(robot, "Neutral");
        } else {
            await updateRobotMood(robot, "Happy");
        }
    } else {
        if (hardware <= 30) {
            await updateRobotMood(robot, "Sad");
        } else {
            await updateRobotMood(robot, "Happy");
        }
    }
}

const RobotsController = {
    createRobot: createRobot,
    updateRobotCurrency: updateRobotCurrency,
    updateRobotBattery: updateRobotBattery,
    updateRobotMemory: updateRobotMemory,
    updateRobotIntelligence: updateRobotIntelligence,
    updateRobotHardware: updateRobotHardware,
    updateRobotMood: updateRobotMood,
    killRobot: killRobot,
    deleteRobot: deleteRobot,
    getRobotByUserId: getRobotByUserId,
    changeStatsOnLogin: changeStatsOnLogin,
    lowerRobotBattery: lowerRobotBattery
};

module.exports = RobotsController;