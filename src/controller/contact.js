const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createEvent = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Access Denied: Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const eventData = {
      ...req.body,
      userId: decoded.id,
    };

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    return res.status(201).json({ event: savedEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
