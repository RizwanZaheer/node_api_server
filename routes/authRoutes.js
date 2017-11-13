const passport = require("passport");
const Authentication = require("../controllers/authentication");
const passportService = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

// Routes
module.exports = app => {
  app.get("/", requireAuth, (req, res) => {
    res.send({ message: "Super secret code is bala bala!" });
  });
  // Signin post Routes
  app.post("/signin", requireSignin, Authentication.signin);

  // Singup Post Route
  app.post("/signup", Authentication.signup);

  app.get(
    "/auth/google/",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("surveys");
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    console.log("current_user");
    res.send(req.user);
  });
};
