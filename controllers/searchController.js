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
  const { fname } = req.body;
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
    })
    .catch(err => console.log(err));
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
    pageSizeLimit,
    skipRecords,
  } = req.body;
  console.log("gender: ", gender);
  console.log("gender: ", fromage);
  console.log("gender: ", toage);
  console.log("gender: ", religion);
  console.log("gender: ", mothertongue);
  console.log("matrialStatus: ", matrialStatus);
  console.log("gender: ", community);
  console.log("gender: ", skintone);
  console.log("gender: ", bodytype);
  console.log("gender: ", hairtype);
  console.log("gender: ", familyaffluence);
  console.log("gender: ", drink);
  console.log("pageSizeLimit: ", pageSizeLimit);
  console.log("skipRecords: ", skipRecords);
  console.log("gender: ", smoke);
  console.log("gender: ", height);

  const status = matrialStatus
    ? [`${matrialStatus}`]
    : ["Single", "Divorced", "Married"];
  const bodytypeArray = bodytype
    ? [`${bodytype}`]
    : ["Slim", "Average", "Athletic", "Heavy"];
  const skintoneArray = skintone
    ? [`${skintone}`]
    : ["Very Fair", "Fair", "Wheatish", "Dark"];
  const familyAffluenceArray = familyaffluence
    ? [`${familyaffluence}`]
    : [
        "Affluent",
        "Upper Middle class",
        "Middle class",
        "Lower Middle class",
        "Lower class",
      ];
  const communityArray = community
    ? [`${community}`]
    : [
        "Chauhdary",
        "Malik",
        "Raja",
        "Qurashi",
        "Shakeh",
        "Butt",
        "Mir",
        "Kayani",
        "Khan",
    ];
  const religionArray = religion ? [`${religion}`] : ["Muslim", "Hindu", "Christian", "No Religion"];

  const hairtypeArray = hairtype
    ? [`${hairtype}`]
    : ["Black Straight long", "Black Straight medium", "Black Straight short"];

  console.log("status is: ", status);
  console.log("body type: ", bodytypeArray);
  User.find({})
    .where("gender")
    .equals(gender)
    // .ne(gender) // not equls
    .where("status")
    .in(status)
    .where("skinTone")
    .in(skintoneArray)
    .where("bodyType")
    .in(bodytypeArray) // in array
    // .nin(bodytypeArray) // not in array
    // .where("hairType")
    // .in(hairtypeArray)
    .where("age")
    .gte(fromage)
    .lte(toage)
    .sort('-age height')
    // .count()
    // .limit(pageSizeLimit)
    .skip(skipRecords)
    // select('name occupation').
    .exec()
    .then(users => {
      // console.log('users is: ', users);
      res.send({
        success: true,
        users,
        message: "getusersbysearchcriteria",
      });
    })
    .catch(err => console.log(err));
};
