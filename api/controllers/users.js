const User = require("../models/user");

const create = async (req, res) => {
  const { email, password } = req.body

  const user = new User({ email, password });
  try {
    await user.save()
    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const update = async (req, res) => {
  // Below could be used if using verification
  // const { email, password } = req.body
  const { id } = req.params

  try {
    const user = await User.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
    res.status(202).json({ message: 'Updated user', user: user })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Error updating users' })
  }
}

const UsersController = {
  create: create,
  update: update
};

module.exports = UsersController;
