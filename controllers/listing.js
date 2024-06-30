//3(a) we are created this folder and this file in  3(a) lec where we will make our file more readable by copying all the routes async function from respected.js grom routes and will copy here and will exports from here
const Listing = require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');//3(b) geocoding lec and this is required from git mapbox-sdk-js
const mapToken = process.env.MAP_TOKEN;//token required from env file
const geocodingClient = mbxGeocoding({ accessToken : mapToken});//3(b) geocoding



module.exports.index = async(req,res)=>{
    const alllistings =  await Listing.find({});
  //   console.log(alllistings);
    res.render("./listings/index.ejs", {alllistings});
};

//3(a) 2nd lec
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}


module.exports.showListing = async(req,res)=>{
    let {id} = req.params;

 const listing2 =   await Listing.findById(id)
 .populate({
  path : "reviews",    
  populate:{               //this line is added in 2(e) last lec
      path: "author",
  },
 })
 .populate("owner");  //.populate("User") ko hmne 2(e) ke lec listing owner m add kiya
 
 if(!listing2){
  req.flash("error", "Listing you requested for does not exist!"); //3.2(c) ka flash waala part and isko hm define kiye h app.js m
  return res.redirect("/listings");
 }

  console.log(listing2);
 res.render("./listings/show.ejs", {listing2});
};



module.exports.createListing = async(req,res,next)=>{

   let response = await geocodingClient.forwardGeocode({ //3(b) lec of geocoding it is copied from document mapbox-sdk-js/docs/servies.md
    query: req.body.listing.location,
    limit: 1
  })
  .send();

  // console.log(response.body.features[0].geometry);
  // res.send("done!");
    




   let url = req.file.path;                  //3(a) save link in mongo 11th step
   let filename = req.file.filename;          //3(a) save link in mongo 11th step
  console.log(url, "..", filename);

    // const newlist = req.body.listing; or //let {title, image, description,location, country ,price} = req.body;
    // console.log(newlist);
    //we are removing this if(!req.body.listing) because we are now going to use listingSchema from Schema.js file which validate server side schema
    //   if(!req.body.listing){
    //     throw new ExpressError(400, "send valid data for listing");
    //   }

     
     const newlist = new Listing(req.body.listing);     //this will again call app.use middleware
    
     newlist.owner = req.user._id;  //this is 2(e) ka lec of listing owners and yahaan pr hm newlist bnane pr naye user ko add kr rhe h as a owner in our data base jis naam se vo loggedin h.
     newlist.image = {url, filename}; // this 12th part of 3(a) lec save link in mongo

      newlist.geometry = response.body.features[0].geometry; //3(b) m geocoding m add kiya models ke andar geometry schema bnane ke baad now go to map.js and add map marker

     let savedListing = await newlist.save();
     console.log(savedListing);
    req.flash("success", "New Listing Created!"); //3. ->2(c) ka flash waala part and isko hm define kiye h app.js m
    res.redirect("/listings"); 
  };



  module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing2 =   await Listing.findById(id);
    
    if(!listing2){ //this is 2(c) ka part of flash message
      req.flash("error", "Listing you requested for does not exist!"); //3->2(c) ka flash waala part and isko hm define kiye h app.js m
    return res.redirect("/listings");
  }
        //3(b) 2nd lec
        let originalImageUrl = listing2.image.url;
       originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
        
      res.render("listings/edit.ejs", {listing2 , originalImageUrl});  
  
    
};



module.exports.updateListing = async(req,res)=>{
    let {id} = req.params; 

    //these lines we are adding in 2(e) lec authorization listings  //hme iss code ko har route m daalna hoga to usase better h ki iska ek middleware create krde in middleware.js m and usko har jagah add kre
  //  let listing = await Listing.findById(id);
  //  if(!listing.owner.equals(res.locals.currUser._id)){
  //   req.flash("error", "you don't have permission to edit");
  //   return res.redirect(`/listings/${id}`);
  //  }
  //  //end


    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){   //3(b) 1st lec
    let url = req.file.path;                  //3(b) 1st lec
   let filename = req.file.filename;          //3(b) 1st lec

   listing.image = {url,filename};
   await listing.save();
    }                      // this whole code added in 3(b) 1st lec



    // res.redirect(`/listings/${id}`);
    req.flash("success", "Listing Updated!"); //3.2(c) ka flash waala part and isko hm define kiye h app.js m
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
  let deletedlisting =  await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  req.flash("success", "Listing Deleted!"); //3.2(c) ka flash waala part and isko hm define kiye h app.js m
  res.redirect("/listings");
};