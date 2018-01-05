const User = require("../models/Users");

exports.findUserByEmail = (req, res, next) => {
  console.log("user controller working!!!!");
};

// findUserByIdAndUpdateImageUrl
exports.findUserByIdAndUpdateImageUrl = (req, res, ext) => {
  const { userId, imageUrl } = req.body;
  console.log(userId, imageUrl);
  console.log("imageurl type:", typeof imageUrl);
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { image: imageUrl } },
    { new: true },
    (err, doc) => {
      if (err) return next(err);
      // If a user with email does exist, returns an error
      if (doc) {
        return res.send({ new_user_detail: doc });
      }

      // If a user with email does Not Exist, create and save user record
      // Send response back to user with "wrong user id"

      // res.json({
      //   success: false,
      //   currentUser: null
      // });
    }
  );
};
