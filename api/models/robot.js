const mongoose = require("mongoose");

const RobotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    currency: { type: Number, default: 500 },
    batteryLife: { type: Number, default: 100 },
    memoryCapacity: { type: Number, default: 16 },
    intelligence: { type: Number, default: 0 },
    hardware: { type: Number, default: 1 },
    image: { type: String, default: '/Neutralanim.gif' },
    isAlive: { type: Boolean, default: true },
    mood: { type: String },
    likes: { type: Array },
    dislikes: { type: Array },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Robot = mongoose.model("Robot", RobotSchema);
module.exports = Robot;