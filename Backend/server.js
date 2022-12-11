//test node againnn
// const express= require("express");
const bodyParser = require("body-parser");
const http = require("http");
const host = "127.0.0.1";
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text-plain");
  res.end("Hello world");
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
// app= express();
