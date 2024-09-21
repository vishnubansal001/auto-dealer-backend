const express = require("express");
require("express-async-errors");
const cors = require("cors");
const { connectToDB } = require("./config/connectToDB");
require("dotenv").config();
const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const eventRouter = require("./routes/event");
const orderRouter = require("./routes/order");

const init = async () => {
  const app = express();
  const port = process.env.PORT || 4000;
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  connectToDB(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });

  app.use(express.json());
  app.use(cors(corsOptions));

  app.use("/api/v1", userRouter, usersRouter, eventRouter, orderRouter);

  app.get("/", (req, res) => {
    res.send(`this is the dummy home page for the testing!!`);
  });
};

init();