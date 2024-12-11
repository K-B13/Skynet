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

    it('responds with 200', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
            .get(`/robot/${robotId}`)
            expect(response.statusCode).toBe(200);
        });
        
    it('returns the robot', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .get(`/robot/${robotId}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.name).toEqual("kimi")
    
    });

    it('returns error if robot does not exist', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId
        });
        const response = await request(app)
            .get("/robot/123")
            expect(response.statusCode).toBe(404)
            expect(response.body.message).toEqual("Failed to get robot")
        
    });
});

describe('PUT Currency', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot currency is updated', async () => {
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
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/currency`)
        .send({
            currency: -10
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.currency).toEqual(90)
        
    });

    it('Currency should not drop below 0', async () => {
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
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/currency`)
        .send({
            currency: -200
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.currency).toEqual(0)
    });
});

describe('PUT Battery life', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot battery life is updated', async () => {
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
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/battery`)
        .send({
            batteryLife: -20
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(80)
        
    });
    it('Battery Life should not drop below 0', async () => {
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
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/battery`)
        .send({
            batteryLife: -250
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(0)
        expect(response.body.robot.isAlive).toBe(false)
    });
});

describe('PUT Memory', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot memory capacity is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 100,
            intelligence: 0,
            hardware: 1,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/memory`)
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.memoryCapacity).toEqual(200)
        
    });
});

describe('PUT Intelligence', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot intelligence is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 100,
            intelligence: 0,
            hardware: 1,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send({
            intelligence: 10
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.intelligence).toEqual(10)
        
    });

    it('Should not go above memory capacity', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 100,
            intelligence: 0,
            hardware: 1,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send({
            intelligence: 150
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.intelligence).toEqual(100)
        
    });
});

describe('PUT Hardware', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot hardware is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardware: -50
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(50)
        
    });
    it('Hardware should not drop below 0', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardware: -250
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(0)
        expect(response.body.robot.isAlive).toBe(false)
    });

    it('Hardware can be increased', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardware: 50
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(150)
    });
});

describe('PUT Mood', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot mood is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/mood`)
        .send({
            mood: "happy"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.mood).toEqual("happy")
    });

    it('Should only accept a string as a mood', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/mood`)
        .send({
            mood: 123
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Mood must be a string!!")
    });
});