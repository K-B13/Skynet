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
        console.log("ROBOT ID In CONTROLLER: ",robotId);
        
        const newAmount = req.body.currency
        console.log("AMOUNT FROM REQ: ",newAmount);
        
        const singleRobot = await Robot.findById(robotId)
        newCurrency = singleRobot.currency += newAmount
        console.log("NEW CURR: ", newCurrency);
        
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
        res.status(404).json({message: "Failed to get robot"});
    };
};

const RobotsController = {
    createRobot: createRobot,
    getRobot: getRobot,
    updateRobotCurrency: updateRobotCurrency
};

module.exports = RobotsController;