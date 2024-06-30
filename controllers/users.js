//3(a) 3rd lec
//we have implemented full stack project using MVC framework
const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try {
    let {username , email , password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!"); //these two this and below this lines are outside this box but added in 2(e) login after signup lec
    res.redirect("/listings");
    }); //2(e ) ka lec login after signup//this is method inside passport = req.login(user, callback); //when user signup then automatically log in the newly registered user
    
    } catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
    
    };


    module.exports.renderLoginForm = (req,res)=>{
        res.render("users/login.ejs");
    };


    module.exports.login = async(req,res)=>{
        req.flash("success","Welcome back to Wanderlust! You are logged in!");
        let redirectUrl = res.locals.redirectUrl || "/listings"; //2(e) ka post-signup lec last moment
       res.redirect(redirectUrl);//pehle iske andar /listings hua krta tha magar 2(e) ke post-signup lec m isme req.session.redirectUrl daala gya. //iski information hmne middleware.js m note kraayi h//and iski value hm locals middleware m bhi store kra lenge middleware.js m hi.//iske baad hm res.locals.redirectUrl yahaan pr daalenge.
      };



      module.exports.logout =  (req,res)=>{
        req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "you are logged out!" );
        res.redirect("/listings");
        });  //this is a function in passport which automatically logout user out of website //ye ek callback leta h jisme ye btata h ki jaise hi user logout ho jaaye immediately kya kaam hona chahiye usko define krta h
      };