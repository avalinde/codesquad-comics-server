//auth Router

//all routes start with /auth

const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authController");

router.post("/register", register);

router.get("/login", login);

router.get("login/error", (request, response, next) => {
  response.status(400).json({
    error: { message: "There was an error when logging in" },
    statusCode: 400,
  });
});

router.get("login/local", localLogin);

router.get("/logout", logout);

//google auth

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

router.get("/unauthenticated", (request, response, next) => {
  console.log("Returning to the homepage...");
  return response.redirect("/");
});

module.exports = router;
