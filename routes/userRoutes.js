const getAge = require("get-age");
const {
  findUserByIdAndUpdateImageUrl,
  getUserDetail,
  updateAndSaveUser,
  saveAndUpdatePartnerPreferences,
  getDetails,
  getUsers,
  getAllUsers,
  getUserEmail,
  findUserByEmail,
  // sendMail,
  addUserInRejectedList,
  getMatchUsersProfile
} = require("../controllers/userController");
const { sendEmail } = require("../controllers/email");

module.exports = app => {
  app.post("/api/upload", findUserByIdAndUpdateImageUrl);
  // find specific user by userId
  app.post("/api/getuserdetail", async (req, res) => {
    try {
      const data = await getUserDetail(req);
      res.json(data);
    } catch ({message}) {
      res.json(message);
    }
  }
  );
  // find user's by userid/gender type female/male
  // throught partner preferences
  app.post("/api/getusers", getUsers);
  app.post("/api/getmatchusersprofile", getMatchUsersProfile);

  // get user/partner preferences using userId
  app.post("/api/getdetails", async (req, res) => {
    try {
      const data = await getDetails(req);
      res.json(data);
    } catch ({ message }) {
      res.json(message);
    }
  }
  );

  app.post("/api/getuseremail", async (req) => {
    try {
      const data = await getUserEmail(req);
      res.json(data);
    } catch ({ message }) {
      res.json(message);
    }
  });

  // update the existing user
  //and send back the save new change
  app.post("/api/updateandsaveuser", async (req, res) => {
    try {
      const data = await updateAndSaveUser(req, res);
      res.json(data);
    } catch ({message}) {
      res.json(message);
    }
  }
  );

  app.patch("/api/adduserinrejectedlist",
    async (req, res) => {
      try {
        const data = await addUserInRejectedList(req, res);
        res.json(data);
      } catch ({message}) {
        res.json(message);
      }
  }  
  );

  app.post("/api/getage", (req, res, next) => {
    const { age } = req.body;
    console.log(age);
    const finalage = getAge(age);
    res.send({ success: true, age: finalage });
  });

  app.post('/api/ping', (req, res, next) => {
    findUserByEmail(req, res, next).then(({ message }) => {
      res.json({ message });
    }).catch(({ message }) => {
      res.json({ message });
    })
  });

  app.post("/api/user/email", sendEmail);
};
