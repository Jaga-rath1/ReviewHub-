let express = require("express");
let router = express.Router({mergeParams:true});
//require Review Model 
let Review = require("../database/review.js");
//require isloggedin middleware
let {isloggedin} = require("../middleware.js");
//show all reviews
router.get("/",async(req,res)=>{
    let reviews = await Review.find();
    res.render("listings/show.ejs",{reviews});
});
//to add a new reviews
//render a  form
router.get("/new",isloggedin,(req,res)=>{
    res.render("listings/new.ejs");
});
//add form data to the main database
router.post("/",isloggedin,async(req,res)=>{
    let {username: newusername,
        email : newemail,
        message : newmessage} = req.body;
        let newmsg = await Review({
            username:newusername,
            email : newemail,
            message : newmessage,
        });
        let usermsg = await newmsg.save();
        console.log(usermsg);
        req.flash("success","New Review Added");
        res.redirect("/reviews");
});
//view details of a review
router.get("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let review = await Review.findById(id);
    if(!review){
        req.flash("error","The Page You Wanted Not Exist");
    };
    res.render("listings/view.ejs",{review});
});
//Edit Reviews
router.get("/:id/edit",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let review = await Review.findById(id);
    res.render("listings/edit.ejs",{review});
});
//render edited reviews to the main database
router.patch("/:id",isloggedin, async(req,res)=>{
    let {id} = req.params;
    let {message : newmessage} = req.body;
    let editreview = await Review.findByIdAndUpdate(
        id,{
            message : newmessage,
        },
    );
    req.flash("success","Review Edited SuccessFully");
    res.redirect(`/reviews/${id}`);
});
//destroy route
router.delete("/:id",isloggedin,async(req,res)=>{
    let {id} = req.params;
    let delreview = await Review.findByIdAndDelete(id);
    console.log(delreview);
    req.flash("success","Review Deleted SucccessFully");
    res.redirect("/reviews");
});
module.exports = router;