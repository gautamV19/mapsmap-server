const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passports')(passport);


const voteController = require("../controller/vote_controller");

router.post('/upvote', passport.authenticate('jwt', { session: false }), voteController.upVote);
router.post('/downvote', passport.authenticate('jwt', { session: false }), voteController.downVote);
router.post('/like', passport.authenticate('jwt', { session: false }), voteController.like);
router.post('/dislike', passport.authenticate('jwt', { session: false }), voteController.dislike);

module.exports = router;