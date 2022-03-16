const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(8).max(30).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password1: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  password2: Joi.ref("password1"),
}).with("password1", "password2");

const signinSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const verifySignupRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestBody function");

  let result = signupSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

const verifySigninRequestBody = (req, res, next) => {
  //console.log("IM INSIDE : verifyRequestBody function");

  let result = signinSchema.validate(req.body);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  next();
};

module.exports = {
  signupSchema,
  signinSchema,
  verifySignupRequestBody,
  verifySigninRequestBody,
};