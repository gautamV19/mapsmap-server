const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  type: {
    type: String,
    trim: true,
    enum: ["up", "down"],
  },
}, { timestamps: true });

const Vote = mongoose.model("vote", voteSchema);
module.exports = Vote;
