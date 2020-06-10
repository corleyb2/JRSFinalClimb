const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  recipient: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  message: {
    type: String,
  },
});

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel };
