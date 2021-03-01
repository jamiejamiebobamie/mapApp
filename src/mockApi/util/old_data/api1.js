// app.use(express.static("public"));

// import api1 from "./api1";

import api1_data from "./api1_data";

const express = require("express");
const app = express();

const port = process.env.PORT || 4001;

// GET method route
app.get("/", function(req, res) {
  console.log(api1_data);
  res.send(api1_data);
});

// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");
});

app.listen(port);
//
// module.exports = app;

// export default process.env.mapbox;

// const express = require("express");
// const path = require("path");
//
// const app = require("https-localhost")();
//
// // const app = express();
//
// app.use(express.static(path.join(__dirname, "build")));
//
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
//
// const port = process.env.PORT || 5000;
// app.listen(port);
//
// console.log("App is listening on port " + port);
