const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Robot = require("../../models/robot");
require("../mongodb_helper");
const { changeStatsOnLogin } = require('../../controllers/robot'); 


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


// describe('GET', () => {
//     const mockUserId = new mongoose.Types.ObjectId();
//     beforeEach(async () => {
//         await Robot.deleteMany({});
//     });

//     it('responds with 200', async () => {
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
//             userId: mockUserId
//         });
//         await robot.save()
//         const robotId = robot._id.toString()
//         const response = await request(app)
//             .get(`/robot/${robotId}`)
//             expect(response.statusCode).toBe(200);
//         });
        
//     it('returns the robot', async () => {
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
//             userId: mockUserId
//         });
//         await robot.save()
//         const robotId = robot._id.toString()
//         const response = await request(app)
//         .get(`/robot/${robotId}`)
//         expect(response.statusCode).toBe(200);
//         expect(response.body.robot.name).toEqual("kimi")
    
//     });

//     it('returns error if robot does not exist', async () => {
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
//             userId: mockUserId
//         });
//         const response = await request(app)
//             .get("/robot/123")
//             expect(response.statusCode).toBe(404)
//             expect(response.body.message).toEqual("Failed to get robot")
        
//     });
// });

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
});

describe('PUT Memory', () => {
    beforeEach(async () => {
        await Robot.deleteMany();
    });

    it('Should return a 200 when robot memory capacity is updated', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
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
        expect(response.body.robot.currency).toEqual(300)
        
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
        const robot = new Robot({
            name: "kimi",
            currency: 500,
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
        expect(response.body.robot.currency).toEqual(470)
        
    });

    it('Should not go above memory capacity', async () => {
        const robot = new Robot({
            name: "kimi",
            currency: 500,
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
        expect(response.body.robot.currency).toEqual(470)
        
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
            hardwareChange: -50
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.robot.hardware).toEqual(50)
        expect(response.body.robot.currency).toEqual(450)
        
    });
    it('Hardware should not drop below 0', async () => {
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
        jest.clearAllMocks();
    });

    it('should reduce battery by 10,hardware by 15 if random num is less than 3', async () => {
        jest.spyOn(global.Math, 'random')
            .mockReturnValueOnce(0.1)
            .mockReturnValueOnce(0.2);

        await changeStatsOnLogin(req, res);

        expect(mockRobot.batteryLife).toBe(90);
        expect(mockRobot.hardware).toBe(85);
        expect(mockRobot.currency).toBe(200);
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
