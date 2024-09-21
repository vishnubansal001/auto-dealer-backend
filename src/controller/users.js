const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUser:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.hasOwnProperty("role")) {
      delete req.body.role;
    }
    if (req.body.hasOwnProperty("password")) {
      delete req.body.password;
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error in updateUser:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const userToFetch = await User.findById(req.params.id);

    if (!userToFetch) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userToFetch });
  } catch (err) {
    console.error("Error in getSingleUser:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};