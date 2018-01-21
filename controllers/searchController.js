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

exports.getUserById = (req, res, next) => {
  const { id } = req.body;
  User.findOne({ _id: id}).then((user) => {
    // if (err) return next(err);
    if (user) {
      res.send({
        success: true,
        user
      });
    }
  }).catch((errors) => console.log(errors));
}
