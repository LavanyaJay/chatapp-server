const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

const Sse = require("json-sse");

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get("/", (req, res, next) => {
  res.send("hello");
});

const stream = new Sse();
app.get("/stream", (req, res, next) => {
  const string = JSON.stringify(messages);
  stream.updateInit(string);
  stream.init(req, res);
});

const messages = [];
app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.get("/message", (req, res, next) => {
  res.send(messages);
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
