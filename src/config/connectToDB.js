const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;

exports.connectToDB = (connectToPort) => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      connectToPort();
    })
    .catch((err) => {
      console.log(err);
    });
};
