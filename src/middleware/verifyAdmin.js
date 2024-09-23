const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", req.headers.authorization);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const adminUser = await User.findById(decoded.id);

    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({
          message:
            "Access Denied: You are not authorized to perform this action",
        });
    }

    req.user = adminUser;
    next();
  } catch (err) {
    console.error("Error in verifyAdmin:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
