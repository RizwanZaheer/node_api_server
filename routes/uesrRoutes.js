const getAge = require("get-age");
const {
  findUserByIdAndUpdateImageUrl,
  getUserDetail
} = require("../controllers/userControllers");

module.exports = app => {
  app.post("/api/upload", findUserByIdAndUpdateImageUrl);

  app.post("/api/getuserdetail", getUserDetail);
  app.post("/api/getage", (req, res, next) => {
    const { age } = req.body;
    console.log(age);
    const finalage = getAge(age);
    res.send({ success: true, age: finalage });
  });
};
