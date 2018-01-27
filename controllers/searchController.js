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
          users,
        });
      }
    })
    .catch(err => console.log(err));
};

exports.getUserById = (req, res, next) => {
  const { id } = req.body;
  User.findOne({ _id: id })
    .then(user => {
      // if (err) return next(err);
      if (user) {
        res.send({
          success: true,
          user,
        });
      }
    })
    .catch(errors => console.log(errors));
};

exports.getUserByName = (req, res, next) => {
  const {
   fname
  } = req.body;
  console.log("fname: ", fname);

  User.find({ fname })
    // .where('gender').equals(gender).
  // where('age').gte(fromage).lte(toage).
    .then(users => {
    res.send({
      success: true,
      users,
      message: "getUserByName",
    });
    
  }).catch(err =>console.log(err));
};
exports.getUsersBySearchCriteria = (req, res, next) => {
  const {
    gender,
    fromage,
    toage,
    religion,
    mothertongue,
    matrialStatus,
    community,
    skintone,
    bodytype,
    hairtype,
    familyaffluence,
    drink,
    smoke,
    height,
    bloodgroup,
  } = req.body;
  console.log("gender: ", gender);
  console.log("gender: ", fromage);
  console.log("gender: ", toage);
  console.log("gender: ", religion);
  console.log("gender: ", mothertongue);
  console.log("gender: ", matrialStatus);
  console.log("gender: ", community);
  console.log("gender: ", skintone);
  console.log("gender: ", bodytype);
  console.log("gender: ", hairtype);
  console.log("gender: ", familyaffluence);
  console.log("gender: ", drink);
  console.log("gender: ", bloodgroup);
  console.log("gender: ", smoke);
  console.log("gender: ", height);

  User.find({}).where('gender').equals(gender).
  where('age').gte(fromage).lte(toage).
    then(users => {
    res.send({
      success: true,
      users,
      message: "getusersbysearchcriteria",
    });
    
  }).catch(err =>console.log(err));
};
