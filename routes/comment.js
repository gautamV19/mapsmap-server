const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment_controller');
const passport = require('passport');
require('../config/passports')(passport);

router.post('/addcomment', passport.authenticate('jwt', { session: false }), commentController.createComment);
router.post('/editcomment', passport.authenticate('jwt', { session: false }), commentController.editComment);
router.post('/deletecomment', passport.authenticate('jwt', { session: false }), commentController.deleteComment);
router.get('/getcomment', commentController.getComment);
router.get('/getcommentById', commentController.getCommentById);


module.exports = router;