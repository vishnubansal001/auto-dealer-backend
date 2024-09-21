const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  raiseDate: {
    type: String,
    required: [true, "Raise Date is required"],
  },
  closeDate: {
    type: String,
    required: [true, "Close Date is required"],
    default: "Open",
  },
  eventType: {
    type: String,
    required: [true, "Event Type is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
