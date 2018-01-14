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

exports.getUserDetail = (req, res, next) => {
  const { userId } = req.body;
  console.log("userid: ", userId);
  User.findById({ _id: userId }, (err, doc) => {
    // If a user with id does exist, returns an error
    if (err) return next(err);
    if (doc) {
      PartnerPreferences.findOne({ _user: doc._id }).then((partnerPreferences, err) => {
        if (err) return next(err);
        if (partnerPreferences) {
          return res.json({
            success: true,
            user: doc,
            partnerPreferences
          });
        }
      }).catch((error) => {
        console.log("catch error: ", error);
      });
    }
  });
};

exports.saveAndUpdatePartnerPreferences = (req, res, next) => {
  const {
    fromAge,
    toAge,
    community,
    motherTongue,
    religion,
    status,
    skinTone,
    familyAffluence,
    bloodGroup,
    hairType,
    bodyType,
    drink,
    smoke,
    userId
  } = req.body;
  // checking if user exist with userid 
  PartnerPreferences.findOne({ _user: userId })
    .exec()
    .then((user, err) => {
      if (err) return next(err);
      // if user exist then update the 
      // existing user with new values
      if (user) {
        PartnerPreferences.findOneAndUpdate(
          { _user: userId },
          {
            $set: {
              fromAge,
              toAge,
              community,
              motherTongue,
              religion,
              status,
              skinTone,
              familyAffluence,
              bloodGroup,
              hairType,
              bodyType,
              drink,
              smoke
            }
          },
          { new: true },
          (err, doc) => {
            if (err) next(err);
            if (doc) {
              res.json({
                success: true,
                result: doc
              });
            }
            next();
          }
        );
      } else {
        // if user doesn't exit's
        // then create a new partner preferences
        // and save with current userId
        const partnerPreferences = new PartnerPreferences({
          fromAge,
          toAge,
          community,
          motherTongue,
          religion,
          status,
          skinTone,
          familyAffluence,
          bloodGroup,
          hairType,
          bodyType,
          drink,
          smoke,
          _user: userId
        });
        partnerPreferences
          .save(error => {
            console.log(error);
          })
          .then((user, err) => {
            if (err) return next(err);
            if (user) {
              res.json({
                success: true,
                result: user
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
