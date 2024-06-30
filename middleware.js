//2(d) ka first lec
//yahaan pr hm ek common middleware form kr rhe h logging ka taaki 
//isko easily hr route m use kr ske
const { listingSchema , reviewSchema} = require("./schema.js"); //acquire this listingSchema from the schema.js file for validation of schema with the help of joi
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing");
const Review = require("./models/review"); //2(e) last lec

module.exports.isLoggedIn = (req,res,next) => {
    console.log(req.user); //req.user show the values undefined if user is not logged in and shows the value of user in terminal if user are logged in
    if(!req.isAuthenticated()){ //2(e) lec 1st //ye function check krta h jo current session ke user ki information stored  h kyonki hmara jo session hota h passport ki help se vo user ke session ki bhi information store krata h.
       
        req.session.redirectUrl = req.originalUrl;//2(e) ka post-login page lec // here req.originalUrl gives original routes when you click on addlisting or edit before logging only.
       
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
      }
      next();  //agar user authenticated hota h to next ko call krdo and we know next() kisi bhi route ki further already called link ko call krta h
};

//2(e) ka psot-login page yahaan pr hm middleware bna rhe h jahaan pr .redirectUrl ki value hm locals m store krarhe h
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){ 
         res.locals.redirectUrl = req.session.redirectUrl;
}
    next();
};



//2(e) ka authorization listings lec

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params; 

//these lines we are adding in 2(e) lec authorization listings  //hme iss code ko har route m daalna hoga to usase better h ki iska ek middleware create krde in middleware.js m and usko har jagah add kre
let listing = await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
req.flash("error", "you are not owner of this listing");
return res.redirect(`/listings/${id}`);
}

next();
};


 //2(e) authorization listing
module.exports.validateListing = (req,res,next)=> {
   
        let {error} = listingSchema.validate(req.body);
        //  console.log(result);
         if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errMsg);
         }
         else {
            next();
         }
    };

    //2(e authorization listing)
    module.exports.validateReview = (req,res,next) => {

        let {error} = reviewSchema.validate(req.body);
        //  console.log(result);
         if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errMsg);
         }
         else {
            next();
         }
    };


   //2(e) ka last lec 
    module.exports.isReviewAuthor = async (req,res,next) => {
        let {id ,reviewId} = req.params; 
    
    //these lines we are adding in 2(e) lec authorization listings  //hme iss code ko har route m daalna hoga to usase better h ki iska ek middleware create krde in middleware.js m and usko har jagah add kre
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you are not author of this review");
    return res.redirect(`/listings/${id}`);
    }
    
    next();
    };