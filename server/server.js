require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userRoutes } = require("./routes/userRoutes");
const { climbRoutes } = require("./routes/climbRoutes");
const { tripRoutes } = require("./routes/tripRoutes");
const { messageRoutes } = require("./routes/messageRoutes");
const { relationalRoutes } = require("./routes/relationalRoutes");

const app = express();
const PORT = 4000;

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

userRoutes(app);
climbRoutes(app);
tripRoutes(app);
messageRoutes(app);
relationalRoutes(app);

//called in listener for server status
const start = () => {
  return app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

//exporting start function for use in index.js file
module.exports = { start };
