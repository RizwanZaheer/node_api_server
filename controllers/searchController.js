const User = require("../models/Users");

exports.getAllUsers = (req, res, next) => {
  User.find({})
    .sort({ age: 1 })
    // .limit(5)
    .then((users, err) => {
      if (err) return next(err);
      if (users) {
        res.send({
          success: true,
          users
        });
      }
    })
    .catch(err => console.log(err));
};
