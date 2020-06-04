const mongoose = require("mongoose");

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

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
