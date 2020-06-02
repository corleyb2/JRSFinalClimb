require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Schema Shapes
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  skillLevel: {
    high: {
      type: Number,
    },
    low: {
      type: Number,
    },
  },
  //Picture/avatar - how will i store this?
  //Array for trips??
});

const climbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    town: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
});

// const messageSchema = new mongoose.Schema({
//     sender: {
//         //reference back to users table
//     },
//     recipient: {
//         //reference back to users table
//     },
//     messageDate: {
//         //date type... write a function for this? to slice from default
//     },
//     messageBody: {
//         type: String,
//     }
// })

// const plannedTripSchema = new mongoose.Schema({
//     location: {
//         //reference back to climbSchema table
//     },
// })

//create model which looks in users table, should have the shape of userSchema
const UserModel = mongoose.model("user", userSchema);
const ClimbModel = mongoose.model("climb", climbSchema);
// const PlannedTripModel = mongoose.model("plannedTrip", plannedTripSchema);
// const MessageModel = mongoose.model("message", messageSchema);

//POST REQUESTS
// 1) User Creation
app.post("/user", async (request, response) => {
  try {
    console.log("POST USER");
    let userInstance = new UserModel(request.body);
    console.log(userInstance);
    const createdUser = await UserModel.create(userInstance);
    response.send(createdUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2) Climb Creation

//DELETE REQUESTS
// 1) Delete User (query string)
app.delete("/user", async (request, response) => {
  try {
    console.log("DELETE USER");
    let deleteUserInstance = await UserModel.deleteOne(request.query);
    console.log(deleteUserInstance);
    response.send(deleteUserInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2) Delete User (body)
app.delete("/user", async (request, response) => {
  try {
    console.log("DELETE USER");
    let deleteUserInstance = await UserModel.deleteOne(request.body);
    response.send(deleteUserInstance);
  } catch (error) {
    response.status(500).send(error);
  }
});

// EDIT REQUESTS
// 1) Edit User
app.put("/user", async (request, response) => {
  try {
    console.log("UPDATE USER");
    let updatedUser = await UserModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2) Edit Climb

//GET REQUESTS
// 1) Users- All
app.get("/users", async (request, response) => {
  try {
    console.log("GET USERS");
    let userInstances = await UserModel.find({});
    response.send(userInstances);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2) Users - Find One by query
app.get("/user", async (request, response) => {
  try {
    console.log("GET ONE USER");
    let user = await UserModel.findOne(request.query);
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//used in index.js
const start = () => {
  return app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

//to use start function in index.js file
module.exports = { start };
