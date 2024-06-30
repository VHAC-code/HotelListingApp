//2(b) 1st lec
//Express router = restructure listings

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); //this is error handling function which we use in place of try and catch block 
// const { listingSchema, reviewSchema } = require("../schema.js"); //acquire this listingSchema from the schema.js file for validation of schema with the help of joi
// const ExpressError = require("../utils/ExpressError.js");  //comment out in 2(e) ke authorization listings lec m
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js"); //2(e) ka first lec common middleware requiring for using everywhere
//isOwner and validateListing middleware required in 2(e) lec of authorization listings
 
//3(a) 1st lec
const listingController = require("../controllers/listing.js");

//3(a) form manipulation3 lec 
const multer = require('multer');
const {storage} = require("../cloudConfig.js");//3(a) cloud 9th step
const upload = multer({storage}); //inside => dest: 'uploads/' replace with storage in 9th step  //multer files ko upload naam ke folder m daal dega //inside post request add this = upload.single('listing[image])  and inside res.send we will use req.file

//3(a) 4th lec
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
   
    upload.single("listing[image]"),  
    validateListing,  
    wrapAsync(listingController.createListing));   //for 11th step go to controllers listing.js
// .post(upload.single("listing[image]"), (req,res)=>{   //this we have done in 3(a) form manipulation lec now we will use cloud setup where we will use Cloudinary & .env file
//   res.send(req.file);
// });  //.env file to store environment files of cloudinary in safe space, we do not share this file with anyone
//7. WE HAVE TO INSTALL CLOUDINARY = npm i cloudinary , and also = npm i multer-storage-cloudinary

    //new route
    router.get("/new", isLoggedIn,listingController.renderNewForm );



  router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,   //this middleware is added in 2(e) ke authorization listings waale lec m
    upload.single("listing[image]"),  //this is added in 3(b) 1st lec
    validateListing, 
    wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,   //this middleware is added in 2(e) ke authorization listings waale lec m
        wrapAsync(listingController.destroyListing));





//server side validation for listing
//iska middleware define kr de rhe h in middlware.js m and isko comment out krdenge now in 2(e) ke aothorization listings lec m
// const validateListing = (req,res,next) => {
//     let {error} = listingSchema.validate(req.body);
//     //  console.log(result);
//      if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400,errMsg);
//      }
//      else {
//         next();
//      }
// };



//after /listings removed from every routes which is common part and in place of  app. any route ke jagah router. any route aa gya in 2(b) 1st lec in this file
//index route//ye route ko hmne comment out krdiya 3(a) ke 4th lec m router.route
// router.get("/",wrapAsync(listingController.index));//listingContoller.index we had done in 3(a) 1st lec by copying async function from here and reomoving from here and pasted in contoller listing.js we will do with ohers route too in our routes folder
  


  //New route  //we will use if statement here in 2(e) 1st lec here req.isAuthenticated() hme ye btata h ki user ne logged in kiya h ki nhi agar logged in krega tbhi vo Add new listing kr skta h m enter krega
//   router.get("/new", isLoggedIn,listingController.renderNewForm );
//     (req,res)=>{
//     // console.log(req.user); //we can print valid user related information which is inside req.user after logging in website here in terminal
//     //   if(!req.isAuthenticated()){ //2(e) lec 1st //ye function check krta h jo current session ke user ki information stored  h kyonki hmara jo session hota h passport ki help se vo user ke session ki bhi information store krata h.
//     //     req.flash("error", "you must be logged in to create listing!");
//     //     return res.redirect("/login");
//     //   }    //hmane iss poore ko isliye comment out krdiya bcz hmne iska ek middleware bna liya h middleware.js m
//    //now ab hm middleware yahaan pr pass krenge isLoggedIn

//       res.render("./listings/new.ejs");              //agar hum  yahan pr request "/listings/new" pr bhejenge after   (pehle agar request bhej denge /listings/:id waale ki /listings/new se pehle)    request of "/listings/:id" then request ko yh lgega ki new bhi ek id h and usko search krega magar ye milega nhi isliye "/listings/new" vaali request ko phle hm likh rhe h "/:id" vaale request se
//   });
  
  
  //read or show route //we are using populate with show route in 2(a) lec where we are showing reviews in show .ejs page, populate object id ka data bhi saath me send krta h tbhi isse hm use krte h
//   router.get("/:id", wrapAsync(listingController.showListing));//andar ka maal hmne 3(a) ke 2nd lec m change kiya h
   //comment out in 3(a) 4th lec
  



  //this is one type error handling by try and catch block
  // //create route linked to new route
  // app.post("/listings", async(req,res,next)=>{
  //    // const newlist = req.body.listing; or //let {title, image, description,location, country ,price} = req.body;
  //    // console.log(newlist);
  // try{
  //    const newlist = new Listing(req.body.listing);     //try and catch is error handling part of app.use middleware
  //    await newlist.save();
  //    res.redirect("/listings");}
  //    catch(err){
  //     next(err);
  //    }
  // });
  
  //or
  
  //this is another type error handling by wrapAsync function //we have created utils folder to store these type of extra files in it only
  //create route linked to new route  //isLoggedIn added in 2(e) lec 1st
//   router.post(
//     "/",              //comment out in 3(a) ke 4th lec m
//     isLoggedIn,
//     validateListing, 
//     wrapAsync(listingController.createListing));



  
  //Edit route
  router.get("/:id/edit",
    isLoggedIn,
    isOwner,   //this middleware is added in 2(e) ke authorization listings waale lec m
    wrapAsync(listingController.renderEditForm));



  
  //Update route that is put request  //islogged in 2(e) ka 1st part middleware
//   router.put("/:id",
//      isLoggedIn,
//      isOwner,   //this middleware is added in 2(e) ke authorization listings waale lec m
//      validateListing, 
//      wrapAsync(listingController.updateListing));
    //comment out in 3(a) 4th lec



  //delete route the last one
//   router.delete("/:id", 
//     isLoggedIn,
//     isOwner,   //this middleware is added in 2(e) ke authorization listings waale lec m
//     wrapAsync(listingController.destroyListing))  //commentr out in 3(a) 4th lec

  module.exports = router;