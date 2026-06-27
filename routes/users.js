let express = require("express");
let router = express.Router({mergeParams : true});
let User = require("../models/user.js");
let passport = require("passport");
let {isloggedin} = require("../middleware.js");
//for signup
//render a signup form
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
//add the rendered form to the database
router.post("/signup",async(req,res,next)=>{
    try{
    let {username,email,password} = req.body;
    let newuser = new User({
        username : username ,
        email : email,
    });
    let registeredUser = await User.register(newuser,password);
    req.logIn(registeredUser,(err)=>{
        if(err){
            next(err);
        };
        req.flash("success","Welcome To ReviewHub");
        res.redirect("/reviews");
    });
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
};
});
//for login
//rendered a login form
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
//login user
router.post("/login",passport.authenticate("local",{
    failureRedirect : "/login",
    failureFlash : true,
}),async(req,res)=>{
    req.flash("success","Welcome Back");
    res.redirect("/reviews");
});
//logout user
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        };
        req.flash("success","You Logged Out");
        res.redirect("/login");
    });
});
//for dashboard
router.get("/dashboard",isloggedin,(req,res)=>{
    res.render("listings/dashboard.ejs");
})

module.exports = router;