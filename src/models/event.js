const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    raiseDate: {
      type: String,
      required: [true, "Raise Date is required"],
      default: Date.now().toString(),
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
    description: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
