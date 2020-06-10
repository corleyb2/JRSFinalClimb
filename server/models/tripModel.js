const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "climb",
  },
  dateRange: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  attendees: {
    type: [String],
    // type: [mongoose.Schema.Types.ObjectId],
    // required: true,
    // ref: "user",
  },
});

const TripModel = mongoose.model("trip", tripSchema);

module.exports = { TripModel };
