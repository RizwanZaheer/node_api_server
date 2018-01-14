
const { findAllPartnerPreferences,
  getPartnerPreference
  } = require('../controllers/partnerpreferencesController');


module.exports = app => {

  // return partner preference with specific user
  app.post('/api/getpartnerpreference', getPartnerPreference );
}