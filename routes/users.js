var express = require("express");
var router = express.Router();
const User = require("../model/user");
const { is } = require("express/lib/request");
const {
  verifySignupRequestBody,
  verifySigninRequestBody,
} = require("../utils/JoiSchemas");
var jwt = require("jsonwebtoken");
const UsersController = require("../controllers/UsersController");
const { verifyProfile } = require("../controllers/UsersController");

/* GET users listing. */
router.post("/signup", verifySignupRequestBody, UsersController.signupUser);
router.post("/signin", verifySigninRequestBody, UsersController.signinUser);
router.post("/profile", verifyProfile, UsersController.profileUser);

module.exports = router;