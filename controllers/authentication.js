const jwt = require("jwt-simple");
const User = require("../models/Users");
const keys = require("../config/keys");

function tokenForUser(user) {
  // sub = subject mean who's token belong to
  // iat = issue at time
  const timestamp = new Date().getTime;
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtSecretkey);
}

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token
  // getting current user with req.user
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  // fetching the data from post reqeust
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(422)
      .send({ error: "You Must provide email & password!" });

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    // If a user with email does exist, returns an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If a user with email does Not Exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    // saving User in Db
    user.save(err => {
      if (err) return next(err);

      // Respond to request indication the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
