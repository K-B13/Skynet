const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Robot = require("../../models/robot");
require("../mongodb_helper");

describe('/robot', () => {
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
});