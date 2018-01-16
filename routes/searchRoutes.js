module.exports = app => {
  app.post('/api/search/getallusers', (req, res, next) => {
    console.log('get search getallusers');
    res.send({
      success: true,
      result: "working fine"
    });
  });
}