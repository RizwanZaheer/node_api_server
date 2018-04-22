const { getShortList, addUserInShortList } = require('../controllers/shortList');

module.exports = app => {
  app.post('/api/shortlist',
    async (req, res, next) => {
      try {
        const data = await getShortList(req, res, next);
        return res.json(data);
      } catch ({ message }) {
        return res.json(message);
      }
  }  
  );
  app.post('/api/adduserinshortlist', addUserInShortList);
  
}