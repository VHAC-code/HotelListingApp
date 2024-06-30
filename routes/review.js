//2(b) 2nd lec everything is copied from app.js to here and there we removed all these routes.

const express = require("express");
const router = express.Router({mergeParams: true}); //why we used mergeParams: true here i explained in app.js
const wrapAsync = require("../utils/wrapAsync.js"); //this is error handling function which we use in place of try and catch block 
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js"); //acquire this listingSchema from the schema.js file for validation of schema with the help of joi
const Review = require("../models/review.js"); //accsing review schema model from review.js
const Listing = require("../models/listing.js");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");//3(a) 3rd lec
//in 2(b) 2nd lec sb routes m common part /listings/:id/reviews ko hata kr only / krdenge and app. ke jagah router. kr denge


//server side validation for reviews
//2(e) lec authorization listings m iska hm ek middleware form kr lenge and isko yahaan pr comment out kr denge
// const validateReview = (req,res,next) => {
//     let {error} = reviewSchema.validate(req.body);
//     //  console.log(result);
//      if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400,errMsg);
//      }
//      else {
//         next();
//      }
// };



//2(a) lec.
//Reviews //Post route
//validateReview is a middleware which is passed in between
//wrapAsync for error handling
router.post(
    "/",
    isLoggedIn, //this added in 2(e) authorization review ke part m
    validateReview, 
    wrapAsync(reviewController.createReview));


//delete review route of 2(a) lec 
// $pull = the $pull operator removes from an existing array all instances of a value or values that match a specified condition. and we will use this here
// meaning of my pull syntax = so reviews ke andar jo bhi reviews, reviewid se match krega ham usse pull krlenge by given syntax
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync( reviewController.destroyReview));

module.exports = router;
