require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { UserModel } = require("./models/userModel");
// const { ClimbModel } = require("./models/climbModel");

const app = express();
const PORT = 4000;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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
  // avatar: {
  //   type: String,
  // },
  // myTrips: {
  //   Array for trips??
  // },
  // friendList: {
  //   Array to ref back to user table of other userId
  // },
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
      type: Number,
    },
  },
  description: {
    type: String,
  },
  photos: {
    type: String,
  },

  //Pictures/avatar - how will i store this?
  //Array for trips?
});

// const messageSchema = new mongoose.Schema({
//     sender: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "user"
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

// const tripSchema = new mongoose.Schema({
//   location: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "climb",
//   },
//   dateRange: {
//     start: {
//       type: String,
//       required: true,
//     },
//     end: {
//       type: String,
//       required: true,
//     },
//   },
//   attendees: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "climb",
//   },
// });

//create model which looks in users table, should have the shape of userSchema
const UserModel = mongoose.model("user", userSchema);
const ClimbModel = mongoose.model("climb", climbSchema);

// const TripModel = mongoose.model("plannedTrip", plannedTripSchema);
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
app.post("/climb", async (request, response) => {
  try {
    console.log("POST CLIMBSPOT");
    let climbInstance = new ClimbModel(request.body);
    console.log(climbInstance);
    const createdClimb = await ClimbModel.create(climbInstance);
    response.send(createdClimb);
  } catch (error) {
    response.status(500).send(error);
  }
});

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

// 2) Delete Climb (query string)
app.delete("/climb", async (request, response) => {
  try {
    console.log("DELETE CLIMBSPOT", request);

    let deleteClimbInstance = await ClimbModel.deleteOne(request.query);
    console.log(deleteClimbInstance);
    response.send(deleteClimbInstance);
  } catch (error) {
    console.log("the Catch", error);
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
app.put("/climb", async (request, response) => {
  try {
    console.log("UPDATE CLIMBSPOT");
    let updatedClimb = await ClimbModel.findOneAndUpdate(
      request.query,
      request.body
    );
    response.send(updatedClimb);
  } catch (error) {
    response.status(500).send(error);
  }
});

//GET REQUESTS
// 1a) Users- All
app.get("/users", async (request, response) => {
  try {
    console.log("GET USERS");
    let userInstances = await UserModel.find({});
    response.status(200).send(userInstances);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 1b) Users - Find One by query
app.get("/user", async (request, response) => {
  try {
    console.log("GET ONE USER");
    let user = await UserModel.findOne(request.query);
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2a) Climbs- All
app.get("/climbs", async (request, response) => {
  try {
    console.log("GET ALL CLIMBSPOTS");
    let climbInstances = await ClimbModel.find({});
    response.status(200).send(climbInstances);
  } catch (error) {
    response.status(500).send(error);
  }
});

// 2b) Climbs - Find One by query
app.get("/climb", async (request, response) => {
  try {
    console.log("GET ONE CLIMBSPOT");
    let climb = await ClimbModel.findOne(request.query);
    response.status(200).send(climb);
  } catch (error) {
    response.status(500).send(error);
  }
});

//called inlistener for server status
const start = () => {
  return app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

//exporting start function for use in index.js file
module.exports = { start };
