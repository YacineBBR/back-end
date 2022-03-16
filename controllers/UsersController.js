const User = require("../model/user");
var jwt = require("jsonwebtoken");

module.exports = {
  signupUser: function (req, res, next) {
    let { email, username, password1, password2 } = req.body;

    let newUser = new User({
      username,
      email,
      password: password1,
    });

    User.findOne(
      { $or: [{ email: email }, { username: username }] },
      (err, doc) => {
        if (err) return res.status(500).json({ msg: "Database Error ! " });

        if (doc) {
          return res
            .status(400)
            .json({ msg: "Email Or Username Already Used" });
        } else {
          newUser.save((err, doc) => {
            if (err) {
              console.log("error saving new user !");
            }
            //
            res.send("Signed up successfully !");
          });
        }
      }
    );
  },

  signinUser: function (req, res, next) {
    let { email, password } = req.body;

    User.findOne({ email }, (err, doc) => {
      if (err) return res.status(500).json({ msg: "Database Error" });

      if (doc) {
        doc.comparePassword(password, (err, isMatch) => {
          if (err) return res.status(401).json({ msg: "wrong password" });

          if (isMatch) {
            var token = jwt.sign({ _id: doc._id }, process.env.SECRET);
            return res
              .status(200)
              .json({ msg: "Welcom!", token });
          } else {
            return res.status(401).json({ msg: "Try again !" });
          }
        });
      } else {
        return res.status(400).json({ msg: "Email Not Found!" });
      }
    });
  },

  // verify a token symmetric
  verifyProfile: (req, res, next) => {
    jwt.verify(
      req.headers.authorization,
      process.env.SECRET,
      function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).json({ msg: "try againe !" });
        }

        console.log(decoded);

        req.decoded = decoded;
        next();
      }
    );
  },

  profileUser: function (req, res, next) {
    console.log({ headers: req.headers });

    User.findOne({ _id: req.decoded._id }, (err, user) => {
      console.log({ user });

      return res.send({ ...user._doc, password: null });
    });
  },
};