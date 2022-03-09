const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const passport = require('passport');


const app = express();
app.use(passport.initialize());

app.use(express.json());


const path = require("path");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(cors());

app.use("/", require('./routes'));

require('./config/mongoConnection');


// app.use("/api", require("./routes"))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is listening");
});