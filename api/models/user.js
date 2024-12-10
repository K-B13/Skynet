const mongoose = require("mongoose");
const { Schema, Types } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  robotId: { type: Types.ObjectId, ref: "Robot"}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
