const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const passport = require("passport");
require("../config/passports")(passport);


const userController = require("../controller/user_controller");

router.get("/search", userController.search);
router.get("/:id", passport.authenticate('jwt', { session: false }), userController.getUser);
router.post("/signin", userController.createSession);
router.post("/signup", userController.createUser);
router.post("/edit", userController.editUser);

module.exports = router;