const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 3002;

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
});

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
