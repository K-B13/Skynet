require("../mongodb_helper");
const Robot = require("../../models/robot");
const mongoose = require("mongoose");

describe("Robots model", () => {
    const mockUserId = new mongoose.Types.ObjectId();
    beforeEach(async () => {
        await Robot.deleteMany({});
    });

    const robot = new Robot({
        name: "kimi",
        batteryLife: 100,
        memoryCapacity: 128,
        intelligence: 0,
        image: "",
        isAlive: true,
        mood: "Neutral",
        likes: ["apples", "politics"],
        dislikes: ["oranges"],
        userId: mockUserId
    });

    it('has a name', () => {
        expect(robot.name).toEqual("kimi");
    });

    it('has currency', () => {
        expect(robot.currency).toEqual(500);
    });

    it('has batteryLife', () => {
        expect(robot.batteryLife).toEqual(100);
    });

    it('has memoryCapacity', () => {
        expect(robot.memoryCapacity).toEqual(128);
    });

    it('has intelligence', () => {
        expect(robot.intelligence).toEqual(0);
    });

    it('has hardware', () => {
        expect(robot.hardware).toEqual(100);
    });

    it('has image', () => {
        expect(robot.image).toEqual("");
    });

    it('is alive', () => {
        expect(robot.isAlive).toEqual(true);
    });

    it('has mood', () => {
        expect(robot.mood).toEqual("Neutral");
    });

    it('has likes', () => {
        expect(robot.likes.length).toEqual(2);
        expect(robot.likes[0]).toEqual("apples");
        expect(robot.likes[1]).toEqual("politics");
    });

    it('has dislikes', () => {
        expect(robot.dislikes.length).toEqual(1);
        expect(robot.dislikes[0]).toEqual("oranges");
    });

    it('has userId', () => {
        expect(robot.userId).toEqual(mockUserId);
    })

    it('has a createdAt', () => {
        expect(robot.createdAt).not.toEqual("");
    });

    it('has all attributes', () => {
        const robot1 = new Robot({
            name: "ella",
            batteryLife: 50,
            memoryCapacity: 32,
            intelligence: 0,
            image: "",
            isAlive: true,
            mood: "Happy",
            likes: ["pompoms", "tuna", "sunlight"],
            dislikes: ["cucumbers"],
            userId: mockUserId
        });

        expect(robot1.name).toEqual("ella");
        expect(robot1.currency).toEqual(500);
        expect(robot1.batteryLife).toEqual(50);
        expect(robot1.memoryCapacity).toEqual(32);
        expect(robot1.intelligence).toEqual(0);
        expect(robot1.hardware).toEqual(100);
        expect(robot1.image).toEqual("");
        expect(robot1.isAlive).toEqual(true);
        expect(robot1.mood).toEqual("Happy");
        expect(robot1.likes.length).toEqual(3);
        expect(robot1.likes[0]).toEqual("pompoms");
        expect(robot1.likes[1]).toEqual("tuna");
        expect(robot1.likes[2]).toEqual("sunlight");
        expect(robot1.dislikes.length).toEqual(1);
        expect(robot1.dislikes[0]).toEqual("cucumbers");
        expect(robot1.userId).toEqual(mockUserId);
    });

    it('name should be a string', () => {
        expect(typeof robot.name).toBe("string");
        expect(typeof robot.name).not.toBe("number");
    });
});
