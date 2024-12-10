const Robot = require("../models/robot");

function createRobot(req, res) {
    const name = req.body.name;
    const likes = req.body.likes;
    const dislikes = req.body.dislikes;

    const robot = new Robot({
        name, likes, dislikes
    });

    robot.save()
    .then((robot) => {
        console.log("Robot created");
        res.status(201).json({message: "Robot created"});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({message: "Robot creation failed"});
    });
};

const RobotsController = {
    createRobot: createRobot
};

module.exports = RobotsController;