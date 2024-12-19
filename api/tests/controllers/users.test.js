const request = require("supertest");

const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");
const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      userId: userId,
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
        .send({ email: "poppy@email.com", password: "Something1?" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarconstt@email.com", password: "Something1?" });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarconstt@email.com");
      expect(newUser.password).toEqual("Something1?");
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
        .send({ password: "Something1?" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "Something1?" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email/password fails validation check", () => {
    it("invalid email returns 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "testemail9@@test.com", password: "Something1?" });
        expect(response.statusCode).toBe(406)
        expect(response.body.emailErrors).toEqual(['Email must be in the correct format'])
    })

    it("invalid password returns 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "testemail9@test.com", password: "n0capitals!" });
        expect(response.statusCode).toBe(406)
        expect(response.body.passwordErrors).toEqual(['Password does not have an upper case letter'])
    })
  })

  describe("PUT, updating with valid token", () => {
    it("changing email", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "someone2@example.com" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone2@example.com");
      expect(users[0].password).toEqual("Something1?");
    })

    it("changing password", async () => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "Something123?" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone@example.com");
      expect(users[0].password).toEqual("Something123?");
    })

    it("changes one and only the one when there are multiple users", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      await User.create({
        email: "someone2@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'someone3@example.com', password: "Something123?" });
      expect(response.status).toEqual(202)
      const users = await User.find();
      expect(users[0].email).toEqual("someone3@example.com");
      expect(users[0].password).toEqual("Something123?");
      expect(users[1].email).toEqual("someone2@example.com");
      expect(users[1].password).toEqual("Something1?");
    })

    it("Makes sure changed user is returned", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'someone3@example.com', password: "Something123?" });
      expect(response.status).toEqual(202)
      expect(response.body.user.email).toEqual("someone3@example.com");
      expect(response.body.user.password).toEqual("Something123?");
    })

    it("Makes sure if email is wrong it is not updated", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'someone3example.com' });
      expect(response.status).toEqual(400)
      expect(response.body.emailErrors).toEqual(['Email must be in the correct format'])
      const foundUser = await User.findById(user._id)
      expect(foundUser.email).toEqual("someone@example.com");
      expect(foundUser.password).toEqual("Something1?");
    })

    it("Makes sure if password is wrong it is not updated", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "Something" });
      expect(response.status).toEqual(400)
      expect(response.body.passwordErrors).toEqual(['Password does not have special character', 'Password does not have a number'])
      const foundUser = await User.findById(user._id)
      expect(foundUser.email).toEqual("someone@example.com");
      expect(foundUser.password).toEqual("Something1?");
    })

    it("cannot change someone else's password", async () => {
      const user1 = await User.create({
        email: "userone1@example.com",
        password: "User1password!"
      })
      const user2 = await User.create({
        email: "usertwo2@example.com",
        password: "User2password!"
      })
      const user1token = createToken(user1._id)
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Authorization", `Bearer ${user1token}`)
        .send({ password: "User1password!" });
      expect(response.statusCode).toBe(400)
      const users = await User.find();
      expect(users[0].email).toEqual("userone1@example.com");
      expect(users[0].password).toEqual("User1password!");
      expect(users[1].email).toEqual("usertwo2@example.com");
      expect(users[1].password).toEqual("User2password!");
    })

    it("cannot change someone else's email", async () => {
      const user1 = await User.create({
        email: "userone1@example.com",
        password: "User1password!"
      })
      const user2 = await User.create({
        email: "usertwo2@example.com",
        password: "User2password!"
      })
      const user1token = createToken(user1._id)
      const response = await request(app)
        .put(`/users/${user2._id}`)
        .set("Authorization", `Bearer ${user1token}`)
        .send({ email: "goodlucklogginginnow@gmail.com"});
      expect(response.statusCode).toBe(400)
      const users = await User.find();
      expect(users[0].email).toEqual("userone1@example.com");
      expect(users[0].password).toEqual("User1password!");
      expect(users[1].email).toEqual("usertwo2@example.com");
      expect(users[1].password).toEqual("User2password!");
    })
  })

  describe('PUT, when no token is provided', () => {
    it("changing email without a token returns an error", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const response = await request(app)
        .put(`/users/${user._id}`)
        .send({ email: "someone2@example.com" });
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual('auth error');
    })

    it("changing the password without a token returns an error", async() => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })

      const response = await request(app)
        .put(`/users/${user._id}`)
        .send({ password: "Something123?" });

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual('auth error');
    })
  })

  describe('DELETE, delete user when valid token', () => {
    it('delete a given user and make sure status code is 202', async () => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      
      const users = await User.find()
      expect(response.status).toBe(202)
      expect(users.length).toBe(0)
    })

    it('deleted a given user when there are multiple users', async () => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const user2 = await User.create({
        email: "someone2@example.com",
        password: "Something1?"
      })
      const user3 = await User.create({
        email: "someone3@example.com",
        password: "Something1?"
      })
      const token = createToken(user2._id)
      const response = await request(app)
      .delete(`/users/${user2._id}`)
      .set('Authorization', `Bearer ${token}`)
      
      const users = await User.find()
      expect(response.status).toBe(202)
      expect(users[0].email).toEqual("someone@example.com")
      expect(users[1].email).toEqual("someone3@example.com")
    })

    it('deleted a given user when there are multiple users', async () => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })
      const user2 = await User.create({
        email: "someone2@example.com",
        password: "Something1?"
      })
      const token = createToken(user._id)
      const response = await request(app)
      .delete(`/users/${user2._id}`)
      .set('Authorization', `Bearer ${token}`)
      
      expect(response.status).toBe(400)
      expect(response.body.message).toEqual('You cannot delete someone elses account')
    })
  })

  describe('DELETE, try to delete a user when invalid token', () => {
    it('Fails to delete a user without a valid token', async () => {
      const user = await User.create({
        email: "someone@example.com",
        password: "Something1?"
      })

      const response = await request(app)
      .delete(`/users/${user._id}`)
      
      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual('auth error');
    })
  })
});
