const { getShortList, addUserInShortList } = require('../controllers/shortList');

module.exports = app => {
  app.post('/api/shortlist',
    async (req, res, next) => {
      try {
        const data = await getShortList(req);
        return res.json(data);
      } catch ({ message }) {
        return res.json(message);
      }
  }
  );
  app.post('/api/adduserinshortlist', async (req, res, next) => {
    try {
      const data = addUserInShortList
      return res.json(data);
    } catch ({ message }) {
      return res.json(message);
    }
  });
  
}