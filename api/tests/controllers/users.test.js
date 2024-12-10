const request = require("supertest");

const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");
const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 120 * 60,
    },
    secret
  );
}
describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarconstt@email.com", password: "1234" });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
      expect(newUser.password).toEqual("1234");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("PUT, updating with valid token", () => {
    it("changing email", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "1234"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "someone2@example.com" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone2@example.com");
      expect(users[0].password).toEqual("1234");
    })

    it("changing password", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "1234"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "5678" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone@example.com");
      expect(users[0].password).toEqual("5678");
    })

    it("changies one and only the one when there are multiple users", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "1234"
      })
      await User.create({
        email: "someone2@example.com",
        password: "1234"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'someone3@example.com', password: "5678" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone3@example.com");
      expect(users[0].password).toEqual("5678");
      expect(users[1].email).toEqual("someone2@example.com");
      expect(users[1].password).toEqual("1234");
    })
  })
  // res.status(401).json({ message: "auth error" });

  describe('PUT, when no token is provided', () => {
    it("changing email without a token returns an error", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "1234"
      })
      let error;
      try {
        await request(app)
        .put(`/users/${user._id}`)
        .send({ email: "someone2@example.com" });
      } catch (err) {
        error = err
      }
      expect(error.status).toEqual(401)
      expect(error.message).toEqual('auth error')
    })

    it("changing the password without a token returns an error", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "1234"
      })
      let error;
      try {
        await request(app)
        .put(`/users/${user._id}`)
        .send({ password: "5678" });
      } catch (err) {
        error = err
      }

      expect(error.status).toEqual(401);
      expect(error.message).toEqual('auth error');
    })
  })
});
