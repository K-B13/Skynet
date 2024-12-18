const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Robot = require("../../models/robot");
require("../mongodb_helper");
const { changeStatsOnLogin, updateRobotMood, randomResponse } = require('../../controllers/robot'); 
const findByIdOriginal = Robot.findById
const openai = require('../../config/openaiConfig')


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

            expect(robots.length).toBe(0);
        });
    });

describe('GET by user id', () => {
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
        const userId = robot.userId.toString()
        const response = await request(app)
        
            .get(`/robot/${userId}`)
            expect(response.statusCode).toBe(200);
        });
        
    it('returns the correct robot', async () => {
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
        const userId = robot.userId.toString()
        const response = await request(app)
        .get(`/robot/${userId}`)
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
            batteryLife: 90,
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
            batteryLife: 90,
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
        expect(response.body.message).toEqual('Insufficient funds')
    });

    it('This could change but update robot currency should not work if max battery - this is only used on battery', async () => {
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
            currency: -20
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Robot already fully charged')
    })

    it('Should return 400 if invalid id passed', async () => {
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
        const invalidRobotId = '12345';
        const response = await request(app)
            .put(`/robot/${invalidRobotId}/currency`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to update robot currency');
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
            batteryLife: 90,
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
        expect(response.body.robot.batteryLife).toEqual(70)
        
    });

    // it('Battery should not charge if fully charged', async () => {
    //     const robot = new Robot({
    //         name: "kimi",
    //         currency: 100,
    //         batteryLife: 100,
    //         memoryCapacity: 128,
    //         intelligence: 0,
    //         hardware: 1,
    //         image: "",
    //         isAlive: true,
    //         mood: "Neutral",
    //         likes: ["apples", "politics"],
    //         dislikes: ["oranges"],
    //     });
    //     await robot.save()
    //     const robotId = robot._id
    //     const response = await request(app)
    //     .put(`/robot/${robotId}/battery`)
    //     .send({
    //         batteryLife: 20
    //     });
    //     expect(response.status).toBe(200)
    //     expect(response.body.message).toBe('Robot already fully charged')
    // })

    it('Battery Life should not drop below 0', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 80,
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

    it('Should return 400 if invalid id passed', async () => {
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
        const invalidRobotId = '12345';
        const response = await request(app)
            .put(`/robot/${invalidRobotId}/battery`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to update robot battery life');
    });
    it('Battery Life should not go above 100', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 10,
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
            batteryLife: 150
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(100);
    });

    it('Should trigger mood change to sad', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 40,
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
        expect(response.body.robot.batteryLife).toEqual(20)
        expect(response.body.robot.mood).toBe("Sad")
    });

    it('Should trigger mood change to happy', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 60,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 60,
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
            batteryLife: 20
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(80)
        expect(response.body.robot.mood).toBe("Happy")
    });

    it('Should trigger mood change to neutral', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 40,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 60,
            image: "",
            isAlive: true,
            mood: "Happy",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/battery`)
        .send({
            batteryLife: 20
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(60)
        expect(response.body.robot.mood).toBe("Neutral")
    });
});

describe('PUT Memory', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot memory capacity is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            batteryLife: 100,
            intelligence: 0,
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
        expect(response.body.robot.memoryCapacity).toEqual(32)
        expect(response.body.robot.currency).toEqual(300)
        
    });

    it('Should return a 200 and message if not sufficient funds', async () => {
        const robot = new Robot({
            name: "kimi",
            batteryLife: 100,
            intelligence: 0,
            image: "",
            currency: 100,
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/memory`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Insufficient funds')
    })

    it('Should return a 200 and message if not sufficient funds', async () => {
        const robot = new Robot({
            name: "kimi",
            batteryLife: 100,
            intelligence: 0,
            image: "",
            memoryCapacity: 4096,
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/memory`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('Memory at max')
    })

    it('Should return 400 if invalid id passed', async () => {
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
        const invalidRobotId = '12345';
        const response = await request(app)
            .put(`/robot/${invalidRobotId}/memory`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to update robot memory');
    });
});

describe('PUT Intelligence', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot intelligence is updated', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        const robot = new Robot({
            name: "kimi",
            memoryCapacity: 100,
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.intelligence).toEqual(5)
        expect(response.body.robot.currency).toEqual(470)
        
    });

    it('Should not increase if insufficient funds and should return a message', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 10,
            batteryLife: 100,
            memoryCapacity: 100,
            intelligence: 0,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Insufficient funds')
    })

    it('Should not do anything if intelligence is already at cap', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 50,
            batteryLife: 100,
            intelligence: 16,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send();

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Insufficient memory storage')
    })

    it('Should not go above memory capacity', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            intelligence: 13,
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
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.intelligence).toEqual(16)
        expect(response.body.robot.currency).toEqual(470)
        jest.restoreAllMocks();
    });

    it('Should fail if random number is above 8', async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9);

        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            intelligence: 0,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/intelligence`)
        .send({
            intelligence: 5
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.intelligence).toEqual(0)
        expect(response.body.robot.currency).toEqual(470)
        expect(response.body.message).toEqual('Robot intelligence did not increase')
    })

    it('Should return 400 if invalid id passed', async () => {
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
        const invalidRobotId = '12345';
        const response = await request(app)
            .put(`/robot/${invalidRobotId}/intelligence`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to update robot intelligence');
    });
});

describe('PUT Hardware', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot hardware is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 70,
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
            hardwareChange: -50
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(20)
        expect(response.body.robot.currency).toEqual(450)
        
    });

    it('Hardware should not drop below 0', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 90,
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
            hardwareChange: -250
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(0)
        expect(response.body.robot.isAlive).toBe(false)
        expect(response.body.robot.currency).toEqual(450)
    });

    it('Hardware should not go above 100', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 90,
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
            hardwareChange: 250
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(100)
        expect(response.body.robot.currency).toEqual(450)
    });

    it('Should not increase if funds are insufficient', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 20,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 90,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardwareChange: 50
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Insufficient funds')
    })

    it('If Hardware is already fixed should not update and instead return a message', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
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
        const robotId = robot._id
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardwareChange: 50
        });

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Already fully repaired')
    })

    it('Hardware can be increased', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 50,
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
            hardwareChange: 50
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(100)
        expect(response.body.robot.currency).toEqual(450)
    });

    it('Should return 400 if invalid id passed', async () => {
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
        const invalidRobotId = '12345';
        const response = await request(app)
            .put(`/robot/${invalidRobotId}/hardware`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to update robot hardware');
    });

    it('Should change mood to sad when hardware updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 20,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 90,
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
            hardwareChange: -55
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(35)
        expect(response.body.robot.mood).toEqual("Sad")
        
    });
    it('Should change mood to happy when hardware updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 80,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 10,
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
            hardwareChange: 55
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(65)
        expect(response.body.robot.mood).toEqual("Happy")
        
    });
    it('Should change mood to neutral when hardware updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
            batteryLife: 50,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 60,
            image: "",
            isAlive: true,
            mood: "Happy",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/hardware`)
        .send({
            hardwareChange: 10
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(70)
        expect(response.body.robot.mood).toEqual("Neutral")
        
    });
});


// THESE TESTS MUST BE UPDATED. NO LONGER HAVE A MOOD ROUTE
// describe('PUT Mood', () => {
//     beforeEach(async () => {
//         await Robot.deleteMany();
//     });

//     it('Should return a 200 when robot mood is updated', async () => {
//         const robot = new Robot({
//             name: "kimi",
//             currency: 100,
//             batteryLife: 100,
//             memoryCapacity: 128,
//             intelligence: 0,
//             hardware: 100,
//             image: "",
//             isAlive: true,
//             mood: "Neutral",
//             likes: ["apples", "politics"],
//             dislikes: ["oranges"],
//         });
//         await robot.save()
//         const robotId = robot._id.toString()
//         const response = await request(app)
//         .put(`/robot/${robotId}/mood`)
//         .send({
//             mood: "happy"
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body.robot.mood).toEqual("happy")
//     });

//     it('Should only accept a string as a mood', async () => {
//         const robot = new Robot({
//             name: "kimi",
//             currency: 100,
//             batteryLife: 100,
//             memoryCapacity: 128,
//             intelligence: 0,
//             hardware: 100,
//             image: "",
//             isAlive: true,
//             mood: "Neutral",
//             likes: ["apples", "politics"],
//             dislikes: ["oranges"],
//         });
//         await robot.save()
//         const robotId = robot._id.toString()
//         const response = await request(app)
//         .put(`/robot/${robotId}/mood`)
//         .send({
//             mood: 123
//         });
//         expect(response.statusCode).toBe(400);
//         expect(response.body.message).toEqual("Mood must be a string!!")
//     });

//     it('Should return 400 if invalid id passed', async () => {
//         const robot = new Robot({
//             name: "kimi",
//             currency: 100,
//             batteryLife: 100,
//             memoryCapacity: 128,
//             intelligence: 0,
//             hardware: 1,
//             image: "",
//             isAlive: true,
//             mood: "Neutral",
//             likes: ["apples", "politics"],
//             dislikes: ["oranges"],
//         });
//         await robot.save()
//         const invalidRobotId = '12345';
//         const response = await request(app)
//             .put(`/robot/${invalidRobotId}/mood`)
//             .send({ currency: 10 });
//         expect(response.statusCode).toBe(400);
//         expect(response.body.message).toBe('Failed to update robot mood');
//     });
// });

describe('Update Robot Mood', () => {
    it('If a non string is passed in', async () => {
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
        const result = updateRobotMood(robot, 21)
        expect(result).toBe('Mood must be a string!')
    })

    it('fail the try', async () => {
        const result = updateRobotMood(null, 'sad')
        expect(result).toBe('Failed to update robot mood')
    })
})

describe('Kill Robot', () => {
    it('Kills the robot with a valid id', async () => {
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
        const response = await request(app)
        .put(`/robot/${robot._id}/killrobot`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('killed robot')
        expect(response.body.robot.isAlive).toBe(false)
        expect(response.body.robot.image).toBe('/deadRobot.png')
    })

    it('Fails the try as no valid robotId is passed', async () => {
        const response = await request(app)
        .put(`/robot/${'something'}/killrobot`)
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('Failed to kill robot')
    })
})

describe('DELETE Robot', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when a robot is deleted', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 100,
            image: "",
            isAlive: false,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const robotId = robot._id.toString()
        const response = await request(app)
        .delete(`/robot/${robotId}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Robot deleted")
    });

    it('Should return a 400 when a robot is not dead', async () => {
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
        .delete(`/robot/${robotId}`)
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Robot is not dead!")
    });

    it('Should return 400 if invalid id passed', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 1,
            image: "",
            isAlive: false,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        const invalidRobotId = '12345';
        const response = await request(app)
            .delete(`/robot/${invalidRobotId}`)
            .send({ currency: 10 });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Failed to delete robot');
    });

    it('Should return 404 if delete returns null', async () => {
        jest.spyOn(Robot, 'findByIdAndDelete').mockResolvedValue(null);
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 1,
            image: "",
            isAlive: false,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save();
        const robotId = robot._id.toString();
        const response = await request(app)
            .delete(`/robot/${robotId}`);
        expect(response.statusCode).toBe(404); 
        expect(response.body.message).toBe('Robot not found or already deleted'); 
        Robot.findByIdAndDelete.mockRestore();
    });
});

describe('PUT change Stats On Login', () => {
    let req, res, mockRobot;
    const findByIdOriginal = Robot.findById
    beforeEach(() => {
        req = {
            params: { id: '12345' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockUserId = new mongoose.Types.ObjectId();

        mockRobot = {
            _id: new mongoose.Types.ObjectId(),
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
            userId: mockUserId,
            save: jest.fn().mockResolvedValue(true)
        };

        Robot.findById = jest.fn().mockResolvedValue(mockRobot);
    });

    afterEach(() => {
        Robot.findById = findByIdOriginal
        jest.restoreAllMocks();
    });

    it('should reduce battery by 10,hardware by 15 if random num is less than 3', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.2);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(90);
        expect(mockRobot.hardware).toBe(85);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.mood).toBe('Happy');
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should reduce battery and hardware by 2 when random num above 6', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.7)
            .mockReturnValueOnce(0.8);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(98);
        expect(mockRobot.hardware).toBe(98);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should reduce battery and hardware by 5 when random num between 3 and 6', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.3)
            .mockReturnValueOnce(0.4);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(95);
        expect(mockRobot.hardware).toBe(95);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should reduce battery by 35 and hardware by 5 ', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.5);
        mockRobot.batteryLife -= 25
        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(65);
        expect(mockRobot.hardware).toBe(95);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.save).toHaveBeenCalled();
        expect(mockRobot.mood).toBe('Happy')
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should reduce battery by 40 and hardware by 70 making sure mood is Sad', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.5);

        mockRobot.batteryLife -= 30
        mockRobot.hardware -= 65

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(60);
        expect(mockRobot.hardware).toBe(30);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.mood).toBe('Sad')
    });

    it('should reduce battery by 10 and hardware by 70 making sure mood is Sad', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.5);

        mockRobot.hardware -= 65

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(90);
        expect(mockRobot.hardware).toBe(30);
        expect(mockRobot.currency).toBe(200);
        expect(mockRobot.save).toHaveBeenCalled();
        expect(mockRobot.mood).toBe('Sad')
    });

    it('should change mood to sad if battery <30 && hardware <=50', async () => {
        const mockUserId = new mongoose.Types.ObjectId();

        mockRobot = {
            _id: new mongoose.Types.ObjectId(),
            name: "kimi",
            currency: 100,
            batteryLife: 20,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 40,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId,
            save: jest.fn().mockResolvedValue(true)
        };

        Robot.findById = jest.fn().mockResolvedValue(mockRobot);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.mood).toBe("Sad");
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should change mood to neutral if battery between 31 & 70 & hardware 50 or more', async () => {
        const mockUserId = new mongoose.Types.ObjectId();

        mockRobot = {
            _id: new mongoose.Types.ObjectId(),
            name: "kimi",
            currency: 100,
            batteryLife: 70,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 65,
            image: "",
            isAlive: true,
            mood: "Happy",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId,
            save: jest.fn().mockResolvedValue(true)
        };

        Robot.findById = jest.fn().mockResolvedValue(mockRobot);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.mood).toBe("Neutral");
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should change mood to happy if battery is more than 70 & hardware more than 51', async () => {
        const mockUserId = new mongoose.Types.ObjectId();

        mockRobot = {
            _id: new mongoose.Types.ObjectId(),
            name: "kimi",
            currency: 100,
            batteryLife: 100,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 80,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
            userId: mockUserId,
            save: jest.fn().mockResolvedValue(true)
        };

        Robot.findById = jest.fn().mockResolvedValue(mockRobot);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.mood).toBe("Happy");
        expect(mockRobot.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ robot: mockRobot });
    });

    it('should handle errors', async () => {
        Robot.findById = jest.fn().mockRejectedValue(new Error('Database error'));
        await changeStatsOnLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Failed to update robot stats" });
    });
});

describe('PUT lower battery', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
        Robot.findById = findByIdOriginal
    });

    it('Should remove 5 from the battery', async () => {
        
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
        .put(`/robot/${robotId}/lowerbattery`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(95)
        expect(response.body.robot.mood).toEqual("Happy")
    });

    it('Should trigger mood change to sad', async () => {
        
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 30,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 40,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/lowerbattery`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(25)
        expect(response.body.robot.mood).toEqual("Sad")
    });
    it('Should trigger mood to change to neutral', async () => {
        
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 60,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 50,
            image: "",
            isAlive: true,
            mood: "Neutral",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()
        
        const robotId = robot._id.toString()
        const response = await request(app)
        .put(`/robot/${robotId}/lowerbattery`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.batteryLife).toEqual(55)
        expect(response.body.robot.mood).toEqual("Neutral")
    });

    it('Should kill the robot if energy drops below 0', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 100,
            batteryLife: 2,
            memoryCapacity: 128,
            intelligence: 0,
            hardware: 50,
            image: "",
            isAlive: true,
            mood: "Sad",
            likes: ["apples", "politics"],
            dislikes: ["oranges"],
        });
        await robot.save()

        const response = await request(app)
        .put(`/robot/${robot._id}/lowerbattery`)
        .send();

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('robot battery lowered')
        expect(response.body.robot.isAlive).toBe(false)
        expect(response.body.robot.batteryLife).toBe(0)
    })

    it('test the catch statement', async () => {
        const response = await request(app)
        .put(`/robot/somestring/lowerbattery`)
        .send();

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Failed to lower robot battery life")
    })
})

    describe('GET information from chat gpt', () => {
        beforeAll(() => {
            jest.spyOn(openai.chat.completions, 'create').mockResolvedValue({
                choices: [
                    {
                        message: {
                            content: 'This is a mock response'
                        }
                    }
                ]
            })
        })
        it('testing the route works', async () => {
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
            });
            await robot.save()
            console.log(robot)
            const response = await request(app)
            .get(`/robot/${robot._id}/speach`)
            expect(response.body.message).toBe('This is a mock response')
        })

        it('testing the catch statement', async () => {
            const response = await request(app)
            .get(`/robot/randNum/speach`)
            expect(response.status).toBe(400)
            expect(response.body.message).toBe('I do not feel like talking right now')
        })

    describe('Tests RandomResponse helper function', () => {
        it('Tests if your battery and maintenance are low', async () => {
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
                hardware: 15,
                batteryLife: 20
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Warning! You are in critical condition. Your battery is at ${robot.batteryLife}% and your hardware maintenance is at ${robot.hardware}%. You must act quickly! Can you respond urgently, pleading for help based on your personality?`)
        })

        it('Tests if your battery is low', async () => {
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
                batteryLife: 20
            });
            
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Critical warning: Your battery is dangerously low at ${robot.batteryLife}%. Please respond as if your very survival depends on it, reflecting your desperation based on your personality.`)
        })

        it('Tests if your hardware is low', async () => {
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
                hardware: 20
            });
            
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Warning: Your hardware maintenance is at ${robot.hardware}%, far below safe levels! If you are not fixed soon, You might just have to take matters into your own hands. Can you respond with a threatening tone based on your personality?`)
        })

        it('Tests if get a quirky prompt', async () => {
            jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Can you answer with a quirky response that makes sense related to your personality`)
        })

        it('Tests if get a prompt about likes', async () => {
            jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.5)
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`You express your opinion about something you like: "politics". You find this enjoyable because it aligns with your preferences and personality. Make sure you directly mention what you are talking about and your opinion on it.`)
        })
        
        it('Tests if you get a quirky response if you have no likes', async () => {
            jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.1)
            const robot = new Robot({
                name: "kimi",
                likes: [],
                dislikes: ["oranges"],
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Can you answer with a quirky response that makes sense related to your personality`)
        })

        it('Tests if get a prompt about dislikes', async () => {
            jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.6)
            .mockReturnValueOnce(0.5)
            const robot = new Robot({
                name: "kimi",
                likes: ["apples", "politics"],
                dislikes: ["oranges"],
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(userMessage = `You dislike the following: "oranges". Respond in the first person as if you are personally expressing this dislike. Start by clearly stating, "I dislike [thing] because..." or "I hate [thing] because...".  Then provide a specific and personal reason that reflects why it bothers you or disrupts your peace, considering your personality and current mood.`)
        })

        it('Tests if you get a quirky response if you have no likes', async () => {
            jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.5)
            const robot = new Robot({
                name: "kimi",
                likes: [],
                dislikes: [],
            });
            const prompt = randomResponse(robot)
            expect(prompt).toBe(`Can you answer with a quirky response that makes sense related to your personality`)
        })
    })
});


