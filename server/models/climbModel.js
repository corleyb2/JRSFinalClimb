const mongoose = require("mongoose");

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
    type: [String],
  },
});

const ClimbModel = mongoose.model("climb", climbSchema);

module.exports = { ClimbModel };
