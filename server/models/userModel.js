const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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
  avatar: {
    type: String,
  },
  // myTrips: {
  //   object with date start, date end, location, and accompanying climbers
  // },
  // friendList: {
  //   Array to ref back to user table of other userId
  // },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
