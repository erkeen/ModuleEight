const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const server = express();

server.use(express.json());

server.use("/users", userRouter);

mongoose
  .connect(
    `mongodb://localhost:27017/homework
  `,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(server.listen(3001), () => {
    console.log("Running");
  })
  .catch((err) => console.log(err));
