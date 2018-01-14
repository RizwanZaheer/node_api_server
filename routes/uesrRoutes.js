const getAge = require("get-age");
const {
  findUserByIdAndUpdateImageUrl,
  getUserDetail,
  updateAndSaveUser,
  saveAndUpdatePartnerPreferences
} = require("../controllers/userController");

module.exports = app => {
  app.post("/api/upload", findUserByIdAndUpdateImageUrl);

  app.post("/api/getuserdetail", getUserDetail);
  app.post("/api/updateandsaveuser", updateAndSaveUser);
  app.post("/api/updateandsavepartnerpreferences", saveAndUpdatePartnerPreferences);
  app.post("/api/getage", (req, res, next) => {
    const { age } = req.body;
    console.log(age);
    const finalage = getAge(age);
    res.send({ success: true, age: finalage });
  });
};
