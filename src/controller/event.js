const jwt = require("jsonwebtoken");
const Event = require("../models/event.js");
const User = require("../models/user.js");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({ events });
  } catch (err) {
    console.error("Error in getAllEvents:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.closeEvent = async (req, res) => {
  try {
    const eventToClose = await Event.findById(req.params.id);

    if (!eventToClose) {
      return res.status(404).json({ message: "Event not found" });
    }

    eventToClose.closeDate = new Date().toISOString();
    await eventToClose.save();

    return res
      .status(200)
      .json({ message: "Event closed successfully", event: eventToClose });
  } catch (err) {
    console.error("Error in closeEvent:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
