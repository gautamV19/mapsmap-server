const express = require("express");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.use("/question", require("./question"));
router.use("/user", require("./user"));
router.use("/tag", require("./tag"));
router.use("/comment", require("./comment"));
router.use("/vote", require("./vote"));

router.get("/", async (req, res) => {
  res.status(200).json({
    message: "jay swaminarayan server is on",
    success: true,
  })
});

module.exports = app;
