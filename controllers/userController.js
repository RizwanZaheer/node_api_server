const User = require("../models/Users");
const PartnerPreferences = require("../models/PartnerPreferences");
const getAge = require("get-age");

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
    aboutMySelf,
    bloodGroup,
    community,
    dob,
    drink,
    familyAffluence,
    height,
    motherTongue,
    phone,
    province,
    smoke,
    status,
    skinTone,
    gender,
    hairType,
    bodyType,
    weight,
    city,
    country,
    userId,
    sport,
    movieGenre,
    annualIncome,
    ethenic,
    star,
  } = req.body;
  const newDob = new Date(dob);
  console.log("typeof height is: ", typeof height);
  console.log("typeof weight is: ", typeof weight);
  console.log("typeof phone is: ", typeof phone);
  console.log("height is: ", height);
  // console.log('height parsefloat is: ', parseFloat(height));
  // console.log('typeof height parsefloat is: ', typeof parseFloat(height));
  // return;
  User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        fname,
        email,
        lname,
        education,
        religion,
        aboutMySelf,
        bloodGroup,
        community,
        dob,
        age: getAge(dob),
        drink,
        familyAffluence,
        height,
        motherTongue,
        phone,
        province,
        smoke,
        status,
        skinTone,
        gender,
        hairType,
        bodyType,
        weight,
        city,
        country,
        annualIncome,
        userId,
        ethenic: ethenic.toLowerCase(),
        sport: sport.toLowerCase(),
        movieGenre,
        star,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) next(err);
      if (doc) {
        return res.json({
          success: true,
          user: doc,
        });
      }
      next();
    }
  );
};

// find specific user by userId
exports.getUserDetail = (req, res, next) => {
  const { userId } = req.body;
  console.log("userid: ", userId);
  User.findOne({ _id: userId })
    // where('name.last').equals('Ghost').
    // where('age').gt(17).lt(66).
    // where('likes').in(['vaporizing', 'talking']).
    // .limit(10)
    // sort('-occupation').
    // select('name occupation').
    .exec((err, doc) => {
      // If a user with id does exist, returns an error
      if (err) return next(err);
      if (doc) {
        return res.json({
          success: true,
          user: doc,
          // partnerPreferences
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// get users by  partner preferences
exports.getUsers = (req, res, next) => {
  const { gender, userId } = req.body;
  // console.log("userid: ", userId);
  PartnerPreferences.findOne({ _user: userId }).exec((err, doc) => {
    if (err) return next(err);
    if (doc) {
      User.find({ gender })
        .where("age")
        .gte(doc.fromAge)
        .lte(doc.toAge)
        .sort("-age fname lname")
        // .select(
        //   "fname lname motherTongue gender religion age height city country province image"
        // )
        // .where("likes")
        // .in([doc.bodyType])
        // where('name.last').equals('Ghost').
        // where('likes').in(['vaporizing', 'talking']).
        .limit(8)
        .exec((err, users) => {
          // If a user with id does exist, returns an error
          console.log(users);
          if (err) return next(err);
          if (users) {
            return res.json({
              success: true,
              users,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

// getMatchUsersProfile
exports.getMatchUsersProfile = (req, res, next) => {
  const { gender, userId } = req.body;
  console.log("userid: ", userId);

  User.findOne({ _id: userId }).exec((err, doc) => {
    if (err) return next(err);
    if (doc) {
      console.log('weight is: ', doc.weight - 5) ;
      console.log('religion is: ', doc.religion);
      console.log('age is: ', doc.age);
      const religionArray = [`${doc.religion}`] || ['Muslim'];
      const newAge = parseInt(doc.age || 25);
      User.find({ gender })
        .where("age")
        // .gte(doc.fromAge)
        .lte(newAge)
        .where("weight")
        .lte(doc.weight || 80)
        // .where("religion")
        // .in(religionArray)
        .sort("-age fname lname")
        // .select(
        //   "fname lname motherTongue gender religion age height city country province image"
        // )
        // .where("likes")
        // .in([doc.bodyType])
        // where('name.last').equals('Ghost').
        // where('likes').in(['vaporizing', 'talking']).
        .limit(8)
        .exec((err, users) => {
          // If a user with id does exist, returns an error
          console.log(users);
          if (err) return next(err);
          if (users) {
            return res.json({
              success: true,
              users,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      // return res.json({
      //   success: true,
      //   doc,
      // });
    }
  });
};

exports.getDetails = (req, res, next) => {
  const { userId } = req.body;
  User.findById({ _id: userId }, (err, doc) => {
    // If a user with id does exist, returns an error
    if (err) return next(err);
    try {
      if (doc) {
        PartnerPreferences.findOne({ _user: doc._id })
          .then((partnerPreferences, err) => {
            if (err) return next(err);
            if (partnerPreferences) {
              return res.json({
                success: true,
                user: doc,
                partnerPreferences,
              });
            } else {
              return res.json({
                success: true,
                user: doc,
                partnerPreferences: {}, // due to this when partner preferences detail not present
                // and want to render the user profile in My profile component
              });
            }
          })
          .catch(error => {
            console.log("catch error: ", error);
          });
      } else {
        return res.json({
          success: true,
          user: doc,
          partnerPreferences: {}, // due to this when partner preferences detail not present
          // and want to render the user profile in My profile component
        });
      }
    } catch (error) {
      console.log("in catch: ", error);
    }
  });
};

exports.getUserEmail = (req, res, next) => {
  const { _id } = req.body;
  User.findById({ _id })
    .select("email")
    .then(email => {
      return res.send({
        success: true,
        email,
      });
    })
    .catch(err => console.log(err));
};

exports.addUserInRejectedList = (req, res, next) => {
  const { profileId, _id } = req.body;
  console.log("userId  is: ", _id);
  console.log("profileId  is: ", profileId);
  User.findOne({ _id }).then(user => {
    if (user) {
      const isPresent = user.rejectedBy.indexOf(profileId);
      if (isPresent === -1) {
        user.rejectedBy.push(profileId);
        User.findOneAndUpdate(
          {
            _id,
          },
          {
            $set: {
              rejectedBy: user.rejectedBy,
            },
          },
          {
            new: true,
          }
        )
          .then(doc => {
            if (doc) {
              return res.json({
                success: true,
                message: "Member Successfuly Added in your Rejected List!",
                rejectedByList: doc,
              });
            }
            next();
          })
          .catch(err => console.log(err));
      } else
        return res.json({
          success: true,
          message: "Member is Already in your Rejected List!",
          rejectedByList: user,
        });
    }
    console.log("data is: ", user);
  });
};
