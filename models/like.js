const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  type: {
    type: String,
    trim: true,
    enum: ["like", "dislike"],
  },
}, { timestamps: true });

const Like = mongoose.model("like", voteSchema);
module.exports = Like;
