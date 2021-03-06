const { getShortList, addUserInShortList } = require('../controllers/shortList');

module.exports = app => {
  app.post('/api/shortlist',
    async (req, res) => {
      try {
        const data = await getShortList(req, res);
        return res.json(data);
      } catch ({ message }) {
        return res.json(message);
      }
  }
  );
  app.post('/api/adduserinshortlist', async (req, res) => {
    try {
      const data = await addUserInShortList(req);
      return res.json(data);
    } catch ({ message }) {
      return res.json(message);
    }
  });
  
}