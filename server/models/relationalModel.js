const mongoose = require("mongoose");

const relationalSchema = new mongoose.Schema({
  scheduledTrip: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "trip",
  },
  scheduledUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "user",
  },
});

const RelationalModel = mongoose.model("relational", relationalSchema);

module.exports = { RelationalModel };
