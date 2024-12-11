const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Robot = require("../../models/robot");
require("../mongodb_helper");


describe('POST', () => {
        let mockUserId
        beforeEach(async () => {
            await Robot.deleteMany({});
            mockUserId = new mongoose.Types.ObjectId();
        });
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

    //WHY DOES THIS MAKE THE NEXT ONE FAIL!!!!???
    
    // it('responds with 200', async () => {
    //     await robot.save()
    //     const robotId = robot._id.toString()
    //     const response = await request(app)
    //         .get(`/robot/${robotId}`)
    //         expect(response.statusCode).toBe(200);
    //     });
        
    it('returns the robot', async () => {
        console.log("ROBOT: ", robot);
        
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .get(`/robot/${robotId}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.name).toEqual("kimi")
    
    });

    it('returns error if robot does not exist', async () => {
        const response = await request(app)
            .get("/robot/123")
            expect(response.statusCode).toBe(404)
            expect(response.body.message).toEqual("Failed to get robot")
        
    });
});