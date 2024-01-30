const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures that each email is unique
    trim: true, // removes leading and trailing whitespaces
    lowercase: true, // converts the email to lowercase
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // custom regex for email validation
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password.trim(), 8);
  }

  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.SECRET_KEY);
  // user.tokens = [{ token }];
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
