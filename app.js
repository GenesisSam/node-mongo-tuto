const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require("morgan"); // for logging

// mongo config
const mgDBConfig = require("./mongoConfig");
const port = process.env.port || 8080;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("jwt-secret", mgDBConfig.secret);


// SET UP MONGOOSE
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("MongoDB connected!");
})

mongoose.connect(mgDBConfig.mongodbUri);

app.get("/", (req, res) => {
  res.send("HELLO JWT");
});
// app.use("/", require("./routes/book"));
app.use("/api", require("./routes"));


const server = app.listen(port, () => {
  console.log("Server instance running on " + port + " port");
});
