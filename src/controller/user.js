const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
require('dotenv').config();

exports.signUp = async (req, res) => {
  try {
    const body = req.body;
    if (body?.email) {
      const oldUser = await User.findOne({ email: body?.email });
      if (oldUser) {
        return res
          .status(400)
          .json({ message: "This email is already in use!" });
      }
    }
    const hashedPassword = await bcrypt.hash(body.password, 16);
    if (body.hasOwnProperty("role")) {
      delete body.role;
    }
    if (body.hasOwnProperty("password")) {
      delete body.password;
    }
    const user = new User({
      password: hashedPassword,
      ...body,
      role: "admin",
    });
    await user.save();
    return res
      .status(200)
      .json({ message: "User created successfully", user: user });
  } catch (err) {
    console.log("Error in signUp", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "Unauthorized access" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    return res
      .status(200)
      .json({
        message: "User signed in successfully",
        user: { ...user._doc, jwtToken: token },
      });
  } catch (err) {
    console.log("Error in signIn", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
