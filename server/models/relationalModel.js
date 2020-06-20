const mongoose = require("mongoose");

const relationalSchema = new mongoose.Schema({
  scheduledTrip: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: "climb",
  },
  scheduledUsers: {
    type: [String],
    // type: [mongoose.Schema.Types.ObjectId],
    // required: true,
    // ref: "user",
  },
});

const RelationalModel = mongoose.model("relational", relationalSchema);

module.exports = { RelationalModel };
