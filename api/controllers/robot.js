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
        console.log("ID IN CONTROLLER: ", robotId)
        const singleRobot = await Robot.findById(robotId)
        console.log("Robot found: ", singleRobot);
        res.status(200).json({robot: singleRobot});

    } catch (err) {
        console.log(err);
        res.status(404).json({message: "Failed to get robot"});
    };
};

const RobotsController = {
    createRobot: createRobot,
    getRobot: getRobot
};

module.exports = RobotsController;