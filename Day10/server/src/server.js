const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();

const port = process.env.PORT || 3002;

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

server.use(express.json());

server.use(cors());

server.use("/users", require("./routes/users"));

server.listen(port, () => {
  console.log("Running on port", port);
});
