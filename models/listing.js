const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");//for 2(a) last lec delete listing we are requiring this here
const { ref, required } = require("joi");

const listingSchema = new Schema({
    title:    {
         type: String,
         required: true,
    },
    description: String,
   
     image : {   //3(a) 10th step save link in mongo
     url: String,
     filename: String
      }, 
        
        
      
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type : Schema.Types.ObjectId,
        ref:"Review",
      }
    ],
    owner:{  //isko hmne 2(e) ke lec listing-owner m add kiya h
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    geometry: {  //3(b) geocoding added in listing schema = a geojson data => controllers listing.js ke pass jao
      type: {
        type: String,
        enum: ['Point'], //value which is allowed here
        required: true
      },
      coordinates: {
        type: [Number],
        required : true
      }
    }
});


//old
// image : { 
//   // //   type:  String ,  
//   // //  default: "https://images.unsplash.com/photo-1695173585480-e4d0724ec5b5?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",                       

//   // //   set: (V) => V === "" 
//   // //   ?  "https://images.unsplash.com/photo-1695173585480-e4d0724ec5b5?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   // //     : V ,
//   //   }, 
      




//  { typeKey: '$type' });

// const randomSchema = new Schema ({
//     listings : [listingSchema],
// });

 //when image is not given or null from clien side so for that we use default image link in set processor down image url is given but it cn be empty.
        
          //this is basically a if else statement in form of ternary operator and here we are checking if v is empty then give it some image link, if it is not empty then set to v again.
 //there is {} this error where i denoted my 2 to 3 hr to find exactly what error is here                                                                                                                                                          // v is basically image value, ki user ne kya image upload ki h image ke liye frontend se
// image : {type:  String ,  
//default: 
//"https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",                       

//set: (v)=>{
//v === "" 
    //  ?  "https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
      //  :v },  }



      //so this is we are doing for 2(a) last lec delete listing ki agar hm ek listing ko delete krde then uske reviews bhi reviews collections se delete ho jaane chahiye
      //start
      //this will call at delete route
      //mongoose middleware
    listingSchema.post("findOneAndDelete", async (listing) => {
      if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews}});
      }
    });
  //end

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


                     