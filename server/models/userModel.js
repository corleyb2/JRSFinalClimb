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
  avatar: {
    type: String,
    //uuid on action, need to setup S3 bucket
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
