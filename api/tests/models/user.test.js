require("../mongodb_helper");
const mongoose = require("mongoose")
const User = require("../../models/user");
//we will need a validation test for an unsuccessful email and password
// we will need an update test
// we will need a delete test

// have a test for a successful email
//we also have a test for a successful password
//we have a get all users test
//we have a test for save users
describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
  });
  // we will need a test for if theres no email
  it("get a validation error if no email", async () => {
    const user = new User({
      password: "password",
    });
    let error = null
    try {
      await user.save()
    }
    catch (err) {
      error = err 
    }
    expect(error).toBeDefined()
    expect(error.name).toBe("ValidationError")
    expect(error.message).toBe("User validation failed: email: Path `email` is required.")
  })
// we will need a test for if theres no password
it("get a validation error if no password", async () => {
  const user = new User({
    email: "someone@example.com",
  });
  let error = null
  try {
    await user.save()
  }
  catch (err) {
    error = err 
  }
  expect(error).toBeDefined()
  expect(error.name).toBe("ValidationError")
  expect(error.message).toBe("User validation failed: password: Path `password` is required.")
})
// we will need a test for if theres a integer in the email or password
it("get a validation error if no email or password", async () => {
  const user = new User({
    email: "someone@example.com",
    password: "password",
  });
  let error = null
  await user.save()
  const user2 = new User({
    email: "someone@example.com",
    password:"password",
  })
  try {
    await user2.save()
  }
  catch (err) {
    error = err 
  }
  expect(error).toBeDefined()
  expect(error.code).toBe(11000)
  expect(error.message).toContain("duplicate key error")
  expect(error.message).toContain("email")
})
//we will need to test for the robot id in user model
it.only("will need to be able to take the robot id in user model", async () => {
  const mockRobotId = new mongoose.Types.ObjectId()
  const user = new User({
    email: "someone@example.com",
    password:"password",
  })
  await user.save()
  user.robotId = mockRobotId
  await user.save()
  const users = await User.find()
  console.log(users)
  expect(users[0].robotId).toEqual(mockRobotId)
})
});
