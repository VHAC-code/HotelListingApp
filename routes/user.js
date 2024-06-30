//2(d) ka signup part h ye

const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js"); //2(d) ka post signup
const wrapAsync = require("../utils/wrapAsync");//2(d) ka post signup
const passport = require("passport"); //2(d) last lec
const { saveRedirectUrl } = require("../middleware.js"); //2(e) ka post-signup lec

const userController = require("../controllers/users.js");


//3(a) ka 4th lec
router.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLoginForm)
.post( 
    saveRedirectUrl, //this url called in 2(e) ka post-signup lec
    passport.authenticate("local", 
    {failureRedirect: '/login', 
        failureFlash: true
    }) ,
        userController.login
);



// router.get("/signup", userController.renderSignupForm);



 //2(d) ka post signup  //3(a) 4th lec m comment out
// router.post("/signup", wrapAsync(userController.signup)); //andar m jo bhi naya link addition hua h vo 3(a ) ke 3rd lec m hua h


//2(d) last lec   //coment out in 3(a) 4th lec
// router.get("/login", userController.renderLoginForm);



//2(d) last lec //coment out in 3(a) 4th lec
 //passport.authenticate middleware hi hame btata h ki user pehle se sign up h ki nhi so usko hm yahaan pr use kr rhe h
// router.post(
//     "/login", 
//     saveRedirectUrl, //this url called in 2(e) ka post-signup lec
//     passport.authenticate("local", 
//     {failureRedirect: '/login', 
//         failureFlash: true
//     }) ,
//         userController.login
// );


 //2(e) ka 2nd lec of log out
  router.get("/logout", userController.logout);

module.exports = router;