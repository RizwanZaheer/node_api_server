const {
  getAllUsers,
  getUserById,
 } = require('../controllers/searchController');

module.exports = app => {
  app.post('/api/search/getallusers', getAllUsers);
  app.post('/api/search/getuserbyid', getUserById);
}