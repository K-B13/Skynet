const User = require("../models/user");
const { allPasswordChecks } = require('../validation/passwordValidation')
const { allEmailChecks } = require('../validation/emailValidation')

const create = async (req, res) => {
  const { email, password } = req.body

  // Password and Email Checks
  const { emailErrors, passwordErrors } = validateFields(email, password)
  if (emailErrors.length !== 0 || passwordErrors.length !== 0 ) {
    return res.status(400).json({ passwordErrors, emailErrors })
  }

  const user = new User({ email, password });
  try {
    await user.save()
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const update = async (req, res) => {
  const { email, password } = req.body
  const { id } = req.params

  if (req.userId !== id) {
    return res.status(400).json({ message: 'You cannot update someone elses account'})
  }

  const { emailErrors, passwordErrors } = validateFields(email, password)
  if (emailErrors.length !== 0 || passwordErrors.length !== 0 ) {
    return res.status(400).json({ passwordErrors, emailErrors })
  }

  try {
    const user = await User.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
    res.status(202).json({ message: 'Updated user', user: user })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Error updating users' })
  }
}


const deleteUser = async (req, res) => {
  const { id } = req.params
  if (req.userId !== id) {
    return res.status(400).json({ message: 'You cannot delete someone elses account'})
  }

  try {
    await User.findByIdAndDelete(id)
    res.status(202).json({ message: 'Deleted user' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Error deleting users' })
  }
}

const validateFields = (email, password) => {
  const emailErrors = email ? allEmailChecks(email) : [];
  const passwordErrors = password ? allPasswordChecks(password) : [];
  return { emailErrors, passwordErrors}
}

const UsersController = {
  create: create,
  update: update,
  deleteUser: deleteUser
};

module.exports = UsersController;
