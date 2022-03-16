var express = require("express");
var router = express.Router();
var usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/content", usersRouter);
module.exports = router;
