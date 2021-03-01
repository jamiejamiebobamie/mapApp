const express = require("express");
const path = require("path");

const app = require("https-localhost")();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

// IN TERMINAL:
// nodemon server.js && nodemon ./src/mockApi/api2.js &&  nodemon ./src/mockApi/api1.js
