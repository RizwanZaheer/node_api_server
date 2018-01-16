const {
  getAllUsers
 } = require('../controllers/searchController');

module.exports = app => {
  app.post('/api/search/getallusers', getAllUsers);
}