const PartnerPreferences = require('../models/PartnerPreferences');

exports.findAllPartnerPreferences = (req, res, next) => {
  console.log('In Partner Preferences');
  // PartnerPreferences.find().

}

exports.getPartnerPreference = (req, res, next) => {
  const { userId } = req.body;
  PartnerPreferences.findOne({ _user: userId }).exec().then((doc, err) => {
    if (err) return next(err);
    if (doc) {
      res.send({
        success: true,
        result: doc
      });
    }
  }).catch((error) => {
    console.log(error);
  });
}