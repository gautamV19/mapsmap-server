const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passports')(passport);


const voteController = require("../controller/vote_controller");

router.put('/upvote',passport.authenticate('jwt', { session: false }), voteController.upVote);
router.put('/downvote',passport.authenticate('jwt', { session: false }), voteController.downVote);
router.put('/like',passport.authenticate('jwt', { session: false }), voteController.like);
router.put('/dislike',passport.authenticate('jwt', { session: false }), voteController.dislike);

module.exports = router;