
const Listing = require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;//token required from env file
const geocodingClient = mbxGeocoding({ accessToken : mapToken});



module.exports.index = async(req,res)=>{
    const alllistings =  await Listing.find({});
  //   console.log(alllistings);
    res.render("./listings/index.ejs", {alllistings});
};

//3(a) 
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}


module.exports.showListing = async(req,res)=>{
    let {id} = req.params;

 const listing2 =   await Listing.findById(id)
 .populate({
  path : "reviews",    
  populate:{               //
      path: "author",
  },
 })
 .populate("owner");  
 
 if(!listing2){
  req.flash("error", "Listing you requested for does not exist!"); 
  return res.redirect("/listings");
 }

  console.log(listing2);
 res.render("./listings/show.ejs", {listing2});
};



module.exports.createListing = async(req,res,next)=>{

   let response = await geocodingClient.forwardGeocode({ 
    query: req.body.listing.location,
    limit: 1
  })
  .send();

  // console.log(response.body.features[0].geometry);
  // res.send("done!");
    




   let url = req.file.path;                  
   let filename = req.file.filename;          
  console.log(url, "..", filename);

  

     
     const newlist = new Listing(req.body.listing);     
    
     newlist.owner = req.user._id; 
     newlist.image = {url, filename}; 

      newlist.geometry = response.body.features[0].geometry; 

     let savedListing = await newlist.save();
     console.log(savedListing);
    req.flash("success", "New Listing Created!"); 
    res.redirect("/listings"); 
  };



  module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing2 =   await Listing.findById(id);
    
    if(!listing2){ //this is 2(c) ka part of flash message
      req.flash("error", "Listing you requested for does not exist!"); 
    return res.redirect("/listings");
  }
        //3(b) 2nd lec
        let originalImageUrl = listing2.image.url;
       originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
        
      res.render("listings/edit.ejs", {listing2 , originalImageUrl});  
  
    
};



module.exports.updateListing = async(req,res)=>{
    let {id} = req.params; 

    


    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){   
    let url = req.file.path;                  
   let filename = req.file.filename;          

   listing.image = {url,filename};
   await listing.save();
    }                     



    // res.redirect(`/listings/${id}`);
    req.flash("success", "Listing Updated!"); 
    res.redirect(`/listings/${id}`);
}



module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
  let deletedlisting =  await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  req.flash("success", "Listing Deleted!"); 
  res.redirect("/listings");
};
