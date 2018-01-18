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
    userId
  } = req.body;
  const newDob = new Date(dob);
  console.log("dob is: ", newDob );
  console.log("dob is: ", typeof newDob);
  User.findOneAndUpdate(
    {
      _id: userId
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
        userId
      }
    },
    { new: true },
    (err, doc) => {
      if (err) next(err);
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
          user: doc
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
      // console.log('wroking!!!!!!!!!', doc);
      console.log("wroking!!!!!!!!!", typeof doc.fromAge);
      console.log("wroking!!!!!!!!!", typeof doc.toAge);
      User.find({ gender })
        .where("age")
        .gt(doc.fromAge - 1)
        .lt(doc.toAge + 1)
        // .where("likes")
        // .in([doc.bodyType])
        // where('name.last').equals('Ghost').
        // where('likes').in(['vaporizing', 'talking']).
        .limit(10)
        .sort("age")
        .select(
          "fname lname motherTongue religion age height city country province aboutMySelf image"
        )
        .exec((err, users) => {
          // If a user with id does exist, returns an error
          console.log(users);
          if (err) return next(err);
          if (users) {
            return res.json({
              success: true,
              users
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

exports.getDetails = (req, res, next) => {
  const { userId } = req.body;
  console.log("userid: ", userId);
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
                partnerPreferences
              });
            }
          })
          .catch(error => {
            console.log("catch error: ", error);
          });
      }
      else {
        return res.json({
          success: true,
          user: doc,
          partnerPreferences: {}// due to this when partner preferences detail not present
          // and want to render the user profile in My profile component
        });
      }
    } catch (error) {
      console.log('in catch: ', error);
    }
    
    
  });
};
