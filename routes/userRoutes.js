const getAge = require("get-age");
const {
  findUserByIdAndUpdateImageUrl,
  getUserDetail,
  updateAndSaveUser,
  saveAndUpdatePartnerPreferences,
  getDetails,
  getUsers
} = require("../controllers/userController");

module.exports = app => {
  app.post("/api/upload", findUserByIdAndUpdateImageUrl);
  // find specific user by userId
  app.post("/api/getuserdetail", getUserDetail);
  // find user's by userid/gender type female/male
  // throught partner preferences
  app.post("/api/getusers", getUsers);

  // get user/partner preferences using userId
  app.post("/api/getdetails", getDetails);
  // update the existing user 
  //and send back the save new change 
  app.post("/api/updateandsaveuser", updateAndSaveUser);
  app.post("/api/updateandsavepartnerpreferences", saveAndUpdatePartnerPreferences);
  app.post("/api/getage", (req, res, next) => {
    const { age } = req.body;
    console.log(age);
    const finalage = getAge(age);
    res.send({ success: true, age: finalage });
  });
};
