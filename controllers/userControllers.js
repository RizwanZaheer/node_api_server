const User = require("../models/Users");

exports.findUserByEmail = (req, res, next) => {
  console.log("user controller working!!!!");
};

// findUserByIdAndUpdateImageUrl
exports.findUserByIdAndUpdateImageUrl = (req, res, next) => {
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
        return res.json({ new_user_detail: doc });
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

exports.updateAndSaveUser = (req, res, next) => {
  const {
    fname,
    email,
    lname,
    education,
    religion,
    about_my_self,
    blood_group,
    caste,
    dob,
    drink,
    height,
    mother_tongue,
    phone,
    province,
    smoke,
    status,
    weight,
    city,
    country,
    userId
  } = req.body;
  // console.log(" response : ", {
  //   fname,
  //   email,
  //   lname,
  //   education,
  //   religion,
  //   about_my_self,
  //   blood_group,
  //   caste,
  //   dob,
  //   drink,
  //   height,
  //   mother_tongue,
  //   phone,
  //   province,
  //   smoke,
  //   status,
  //   weight,
  //   city,
  //   country,
  //   userId
  // });
  User.findOneAndUpdate(
    {
      _id: userId
    },
    { $set: {
      fname,
      email,
      lname,
      education,
      religion,
      about_my_self,
      blood_group,
      caste,
      dob,
      drink,
      height,
      mother_tongue,
      phone,
      province,
      smoke,
      status,
      weight,
      city,
      country,
      userId
    } },
    { new: true },
    (err, doc) => {
      if (err) next(err)
      if (doc) {
        return res.json({
          success: true,
          user: doc
        });
      }
      next();
    }
  );
};

exports.getUserDetail = (req, res, next) => {
  const { userId } = req.body;
  console.log("userid: ", userId);
  User.findById({ _id: userId }, (err, doc) => {
    if (err) return next(err);
    // If a user with id does exist, returns an error
    if (doc) {
      return res.json({
        success: true,
        user: doc
      });
    }
    next();
  });
  // res.json({message: "success"});
};
