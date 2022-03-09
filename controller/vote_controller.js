const Question = require("../models/question");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Vote = require("../models/vote");

module.exports.upVote = async function (req, res) {
  const question_id = req.query.question_id;
  const user_id = req.user.id;
  const question = await Question.findById(question_id);
  //Tracking user votes
  const existingVote = await Vote.findOne({
    user: user_id,
    question: question_id,
  });
  if (existingVote) {
    if (existingVote.type === "down") {
      question.vote += 2;
      existingVote.type = "up";
      await question.save();
      await existingVote.save();
    } else {
      return res.status(403).json("You have already voted this question");
    }
  } else {
    question.vote += 1;
    question.save();
    new Vote({
      user: user_id,
      question: question_id,
      type: "up",
    }).save();
  }
  return res.status(200).json("Question upVoted!");
};

module.exports.downVote = async function (req, res) {
  const question_id = req.query.question_id;
  const user_id = req.user.id;
  const question = await Question.findById(question_id);
  //Tracking user votes
  const existingVote = await Vote.findOne({
    user: user_id,
    question: question_id,
  });
  if (existingVote) {
    if (existingVote.type === "up") {
      question.vote -= 2;
      existingVote.type = "down";
      await question.save();
      await existingVote.save();
    } else {
      return res.status(403).json("You have already voted this question");
    }
  } else {
    question.vote -= 1;
    question.save();
    new Vote({
      user: user_id,
      question: question_id,
      type: "down",
    }).save();
  }
  return res.status(200).json("Question downVoted!");
};

module.exports.like = async function (req, res) {
  const comment_id = req.query.comment_id;
  const user_id = req.user.id;
  const comment = await Comment.findById(comment_id);

  const existingLike = await Like.findOne({
    user: user_id,
    comment: comment_id,
  });
  if (existingLike) {
    if (existingLike.type === "dislike") {
      comment.likes += 1;
      comment.dislikes -= 1;
      existingLike.type = "like";
      await comment.save();
      await existingLike.save();
    } else {
      return res.status(403).json("You have already liked this comment");
    }
  } else {
    comment.likes += 1;
    comment.save();
    new Like({
      user: user_id,
      comment: comment_id,
      type: "like",
    }).save();
  }
  return res.status(200).json({ data: { comment }, message: "Comment Liked!" });
};

module.exports.dislike = async function (req, res) {
  const comment_id = req.query.comment_id;
  const user_id = req.user.id;
  const comment = await Comment.findById(comment_id);

  const existingDisLike = await Like.findOne({
    user: user_id,
    comment: comment_id,
  });
  if (existingDisLike) {
    if (existingDisLike.type === "like") {
      comment.likes -= 1;
      comment.dislikes += 1;
      existingDisLike.type = "dislike";
      await comment.save();
      await existingDisLike.save();
    } else {
      return res.status(403).json("You have already disliked this comment");
    }
  } else {
    comment.dislikes += 1;
    comment.save();
    new Like({
      user: user_id,
      comment: comment_id,
      type: "dislike",
    }).save();
  }
  return res.status(200).json({ data: { comment }, message: "Comment disLiked!" });
};
