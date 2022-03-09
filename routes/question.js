const express = require('express');
const passport = require('passport');
require('../config/passports')(passport);

const router = express.Router();

const questionController = require('../controller/question_controller');

router.post('/addquestion', passport.authenticate('jwt', { session: false }), questionController.create);
router.get('/', questionController.getQuestion);

module.exports = router;