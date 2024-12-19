const mongoose = require("mongoose");

const RobotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    currency: { type: Number, default: 500 },
    batteryLife: { type: Number, default: 100 },
    memoryCapacity: { type: Number, default: 16, max: 4096 },
    personality: { type: String, enum: ['Helpful', 'Wise', 'Fiery', 'Playful'], default: 'Helpful' },
    intelligence: { type: Number, default: 0 },
    hardware: { type: Number, default: 100 },
    image: { type: String, default: '/Neutralanim.gif' },
    isAlive: { type: Boolean, default: true },
    mood: { type: String },
    likes: { type: Array },
    dislikes: { type: Array },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    lastLogin: { type: Date }
});

const Robot = mongoose.model("Robot", RobotSchema);
module.exports = Robot;