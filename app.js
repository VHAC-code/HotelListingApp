//3(a) cloud 6th part // kbhi bhi .env file ko production or deployment ke time pr ya fir github pr upload krenge then kbhi bhi glti se .env waali file ko nhi upload krna h kyonki usme jroori credentials hote h
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
// console.log(process.env.SECRET);


const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //ye 3(d) ke 1st lec m comment out ho jaaega

//3(d) 1st lec now in place of MONGO_URL we will use this url
const dbUrl = process.env.ATLASDB_URL;



const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  //ejs mate help us to create multiple layouts you can study its documentation
// const wrapAsync = require("./utils/wrapAsync.js"); //this is error handling function which we use in place of try and catch block 
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");//we are using our knowledge of session from classroom filder m jo pdha tha 2(c) ka

const MongoStore = require('connect-mongo');//this is added after express-session only and this added in 3(d) 2nd lec and also we installed = npm i connect-mongo

const flash = require("connect-flash"); // 1.we are using our knowledge of flash from classroom folder m jo pdha the 2(c) ka

const { wrap } = require("module");
// const { listingSchema, reviewSchema } = require("./schema.js"); //acquire this listingSchema from the schema.js file for validation of schema with the help of joi
// const Review = require("./models/review.js"); //accsing review schema model from review.js

const listingRouter = require("./routes/listing.js");//2(b) 1st lec
const reviewRouter = require("./routes/review.js"); // 2(b) 2nd lec
const userRouter = require("./routes/user.js"); //2(d) ke sign up waala lec


const cookieParser = require("cookie-parser"); //this is 2(b) last cookie lec 
//1st we need to install npm i cookie-parser and then we require cookie parser here
//and then for using this we write this
// app.use(cookieParser());

const passport = require("passport"); // it is part of 2(d)
const LocalStrategy = require("passport-local");//it is part of 2(d)
const User = require("./models/user.js"); //it is part of 2(d)

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})
                                                        //.toLocaleString("en-IN") it is afinction which gives comma in money amount and in parameter we have to give country name we used this finction show.ejs file remember this

async function main(){
   await mongoose.connect(dbUrl);   //yahaan MONGO_URL KE JAGAH IN 3(D) KE 1ST LEC M dburl
};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);  //this is just like include and partials and we will see it in program
app.use(express.static(path.join(__dirname,"/public")));


//3(d) 2nd lec
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,

    },
    touchAfter: 24*3600,
});

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {   //this is 2(c) ka session waala part from classroom folder m jo seekha tha
    store, //added in 3(d) 2nd lec
    secret: process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {                                           //so now ab hamare session ke saath hm ab apne cookie ko expiry date bhi dede rhe h aur bta rhe h ki session aaj jaise hi open kroge uske 7din ke baad jisme 24hr 60 mins 60secs and 1000 millisecond hota h tab tk ye session id expire ho jaega
        expires : Date.now() + 7*24*60*60*1000,   //hm ye concept isliye use krte h taaki jb hm login page m login krle the 7days tk hm login hi rhe hme firse login na krna pde 7 din tk
        maxAge : 7*24*60*60*1000,
        httpOnly : true,  //this is for security purpose
    }
}

//3(c) me isko comment out kr denge
// app.get("/", (req,res)=>{
//     res.send("server working");
// });





app.use(session(sessionOptions));//2(c)
app.use(flash()); //2.2(c) and remember this iss ko hm apne neeche waale routes jo app.use m likhe h for listings and all usese pehle hi hm use krenge

//2(D)= session will also be usede in passport isiliye jo session middleware 2(c) ka upper define h usi ke baad hm 2(d) ka code likhenge
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//4.this middleware is created for using res.locals for flash  2(c)
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");   //ye middleware redirect hoga /listings pe according to code in listing.js inside routes folder
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; //this is 2(e) ka add style lec
    next(); //so hm index.ejs pr jaakar sbse upper hm is success waale message ko use krlenge
})


//2(d) = demouser lec
// ------->>> this is just demo through app.js
// app.get("/demouser", async(req,res)=>{  //passport ke andar pbkdf2 hashing algorithm apply hoti h.
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "vahc-student"
//     });
//    let registeredUser = await User.register(fakeUser, "helloworld");  //helloworld is password sended here.   register(user, password, callback); 
//   res.send(registeredUser);
// });






 
//for using routes waale folder ka file listing.js jahaan pr mera most backend ka crud ka code pda hua h
//2(b) 1st lec
app.use("/listings", listingRouter);

//for using routes waale folder ka file review.js jahaan pr mera most backend ka reviews post code pda hua h
//2(b) 2nd lec
//yahaan pr /listings ke baad /:id h vo reviews file tk pahunch hi nhi paa rhi h so usko pahunchaane ke liye hm ek express ka option hota h merge params : true, isko use krte h inisde express.router in review.js file
app.use("/listings/:id/reviews", reviewRouter);
//basically hamare code ko pta h ki ab jo bhi request in upper diye gye hue routes pr aayegi unki mapping hm listings yaa reviews waali file m krenge respectively

 //2(d) ka signup waala part
 app.use("/", userRouter); //ye slash ke aage jo bhi hm webpage m likhte h wo userRouter se match krwaayega


app.use(cookieParser("secretcode"));
//inside cookie there is name value pair
app.get("/getsignedcookie", (req,res)=>{
  
    res.cookie("madeIn", "India", {signed:true});
    res.send("signed cookie sent!");
});
app.get("/cat",(req,res)=>{
    console.dir(req.cookies);
    res.send("Hi, I am cat!");
});
app.get("/greet", (req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`hi, ${name}`);
})
app.get("/verify", (req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
})

// app.get("/testListing", async(req,res)=>{
// let sampleListing = new Listing({
//     title: "My New Villa",
//     description : "by the beach",
//     // image: "url",
//     price: 1200,
//     location : "calcungt, goa",
//     country: "india",
// });

// await sampleListing.save();
// console.log("sample was saved");
// res.send("successful testing");
// });

app.listen(port, ()=>{
    console.log("Server is listening to port 8080");
});

//error handing part = error handle middleware //this only we use for try and catch and wrapAsync
// app.use((err,req,res,next)=>{
//     res.send("something went wrong!");
// });


//error  handling middleware defined for expresserror and also for wrapAsync
app.all("*", (req,res,next) => {             //this app.all we are using for express error and this * will match with every route with the route which we are searching in web page if that round found in our code then that respond will be send but if not found then ExpressError will called.
    next(new ExpressError(404,"page not found"));
}
)

//app.use specially for ExpressError
app.use((err,req,res,next) => {
    let {statusCode=500 , message ="something went wrong"} = err;  //here statuscode 500 and message = "something went wrong"  are default values if there is no error type or message defined in error handling then this default code will run
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs" , {err});
})
