
const { findUserByIdAndUpdateImageUrl } = require('../controllers/userControllers');

module.exports = app => { 
  app.post('/api/upload', findUserByIdAndUpdateImageUrl );
}