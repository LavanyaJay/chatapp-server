const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const cors = require("cors");
const middleware = cors();
app.use(middleware);
const Sse = require("json-sse");
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get("/", (req, res, next) => {
  res.send("hello");
});

const streams = {};

const stream = new Sse();
const messages = {};

app.get("/stream", (req, res, next) => {
  const rooms = Object.keys(messages);
  const string = JSON.stringify(rooms);
  stream.updateInit(string);
  stream.init(req, res);
});

app.get("/rooms/:roomName", (req, res, next) => {
  const { roomName } = req.params;
  const stream = streams[roomName];
  const data = messages[roomName];
  const string = JSON.stringify(data);
  stream.updateInit(string);
  stream.init(req, res);
});

app.post("/message/:roomName", (req, res, next) => {
  const { message } = req.body;
  const { roomName } = req.params;
  const room = message[roomName];
  const stream = streams[roomName];
  const string = JSON.stringify(message);
  stream.send(string);
  room.push(message);
  res.send(message);
});

app.get("/message", (req, res, next) => {
  res.send(messages);
});

app.post("/room", (req, res, next) => {
  const { name } = req.body;
  send(name);
  rooms.push(name);
  messages[name] = [];
  streams[name] = new Sse();
  res.send(name);
});

send = data => {
  const string = JSON.stringify(data);
  stream.send(string);
};
app.listen(port, () => {
  console.log("Listening on port: " + port);
});
