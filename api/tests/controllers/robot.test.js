const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Robot = require("../../models/robot");
require("../mongodb_helper");

    let mockUserId
    beforeEach(async () => {
        await Robot.deleteMany({});
        mockUserId = new mongoose.Types.ObjectId();
    });

    describe('POST', () => {
        it('responds with 201', async () => {
            const response = await request(app)
                .post("/robot")
                .send({
                    name: "kimi",
                    likes: ["apples", "politics"],
                    dislikes: ["oranges"],
                    userId: mockUserId
                });
            expect(response.statusCode).toBe(201);
        });

        it('creates a robot', async () => {
            const response = await request(app)
               .post("/robot")
               .send({
                    name: "kimi",
                    likes: ["apples", "politics"],
                    dislikes: ["oranges"],
                    userId: mockUserId
                });
            const robots = await Robot.find();
            expect(robots[0].name).toEqual("kimi");
            expect(robots[0].likes).toEqual(["apples", "politics"]);
            expect(robots[0].dislikes).toEqual(["oranges"]);
            expect(robots[0].userId).toEqual(mockUserId);
        });

        it('responds with 400 when no name given', async () => {
            const response = await request(app)
            .post("/robot")
            .send({userId: mockUserId});
            const robots = await Robot.find();
            expect(response.statusCode).toBe(400);
        });

        it('does not create a robot when no name given', async () => {
            const response = await request(app)
            .post("/robot")
            .send({});
            const robots = await Robot.find();
            console.log("test", robots[0]);
            expect(robots.length).toBe(0);
        });
    });


describe('GET', () => {
    const mockUserId = new mongoose.Types.ObjectId();
    beforeEach(async () => {
        await Robot.deleteMany({});
    });

    const robot = new Robot({
        name: "kimi",
        currency: 100,
        batteryLife: 100,
        memoryCapacity: 128,
        intelligence: 0,
        hardware: 1,
        image: "",
        isAlive: true,
        mood: "Neutral",
        likes: ["apples", "politics"],
        dislikes: ["oranges"],
        userId: mockUserId
    });

    const robot2 = new Robot({
        name: "ella",
        currency: 100,
        batteryLife: 100,
        memoryCapacity: 128,
        intelligence: 0,
        hardware: 1,
        image: "",
        isAlive: true,
        mood: "Neutral",
        likes: ["tuna", "valerian"],
        dislikes: ["dogs"],
        userId: mockUserId
    });

    
    it('responds with 200', async () => {
        await robot.save()
        await robot2.save()
        const response = await request(app)
            .get("/robot")
        expect(response.statusCode).toBe(200);
    });

    it('returns every robot', async () => {
        await robot.save()
        await robot2.save()
        const response = await request(app)
            .get("/robot")
            const robots = Robot.find()
            expect(robots.length).toEqual(2)
            expect(robots[0]).toEqual(robot)
            expect(robots[1]).toEqual(robot2)
        
    });
});