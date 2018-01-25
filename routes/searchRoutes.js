const {
  getAllUsers,
  getUserById,
  getUsersBySearchCriteria
 } = require('../controllers/searchController');

module.exports = app => {
  app.post('/api/search/getallusers', getAllUsers);
  app.post('/api/search/getuserbyid', getUserById);
  app.post('/api/search/getusersbysearchcriteria', getUsersBySearchCriteria);
}