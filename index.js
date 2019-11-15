const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get("/", (req, res, next) => {
  res.send("hello");
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
