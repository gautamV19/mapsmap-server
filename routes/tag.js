const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const passport = require("passport");
require("../config/passports")(passport);

const tagController = require('../controller/tag_controller');

router.get('/', tagController.getQuestions);
router.post('/', passport.authenticate('jwt', { session: false }), tagController.create)

module.exports = app;