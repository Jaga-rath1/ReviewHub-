module.exports.isloggedin = ((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You Must Be Logged In To Perform Some Task");
        return res.redirect("/login");
    };
    next();
});