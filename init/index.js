const mongoose = require("mongoose");
const initData = require("./data.js");                //initData is object here
const Listing = require("../models/listing.js");
// const sampleListings = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
                                         //first agar phle se koi data pda and then we will clean it firstly.
  await Listing.deleteMany({});

   initData.data = initData.data.map((obj)=>
    ({...obj, 
      owner:"667ac668774274989c2f847c"
    
    })); //this line is added in 2(e) ke lec listing-owners m and here ...obj means ki object ki old saari properties to aayengi hi saath hi m owner ki ye id bhi add krdo
   
    Listing.insertMany(initData.data) 
  .then((res)=>{
    console.log(res); } );

        
     //jb saare random phle ke data delete ho jaayenge then tb insert 
            console.log(initData.data) ;                                  //krenge apne data ko
  console.log("data was initialized");
};

   initDB();


//    const initDB = async() => {
//     //first agar phle se koi data pda and then we will clean it firstly.
// await Listing.deleteMany({});
// await Listing.insertMany( {
//   title: "Cozy Beachfront Cottage",
//   description:
//     "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//   image: {
//     filename: "listingimage",
//     url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   } ,
//   price: 1500,
//   location: "Malibu",
//   country: "United States",

// },);         //jb saare random phle ke data delete ho jaayenge then tb insert 
// // console.log(initData.data) ;                                  //krenge apne data ko
// console.log("data was initialized");
// };

//   initDB();
 
 