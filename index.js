let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
//for ejsmate
let ejsMate  = require("ejs-mate");
//for method-override
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
//for ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
//require database review model
let Review = require("./database/review.js");
//for express-session
let session = require(`express-session`);
app.use(session({
    secret : "mysecretkey",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now()+ 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000 ,
        httpOnly : true,
    },
}));
//for connect flash
let flash = require(`connect-flash`);
app.use(flash());

//for static file serve
app.use(express.static(path.join(__dirname, "public")));
//for post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for passport 
let passport = require("passport");
let Localstrategy = require("passport-local");
let User = require("./models/user.js");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware for flash
app.use((req,res,next)=>{
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.locals.curruser = req.user;
    next();
});

//app.listen function
app.listen(port,()=>{
    console.log("Bhai Sunuchi Re....");
});
//create a demo user
// app.get("/demouser", async(req,res)=>{
//     let user1 = new User({
//         username : "jk",
//         email : "jk12@gmail.com",
//     });
//     let registereduser = await User.register(user1,"hello12");
//     res.send(registereduser);
// });
//require express router
let reviewsrouter = require("./routes/reviews.js");
app.use("/reviews",reviewsrouter);
//require user router for login & signup
let userrouter = require("./routes/users.js");
app.use("/",userrouter); 