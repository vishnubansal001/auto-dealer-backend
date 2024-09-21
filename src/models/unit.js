const mongoose = require("mongoose");

const unitDetailsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

const unitSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: [true, "Unit Name is required"],
    },
    unitStatus: {
      type: String,
      required: [true, "Unit Status is required"],
    },
    unitDescription: {
      type: String,
      required: [true, "Unit Description is required"],
    },
    additionDate: {
      type: String,
      required: [true, "Addition Date is required"],
    },
    unitDetails: {
      type: [unitDetailsSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
