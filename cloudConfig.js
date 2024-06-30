//this is 8th step of cloud 3(a)
//cloud ko env file se jod rhe h

const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "wanderlust_DEV",
      allowedFormats: ["png", "jpg", "jpeg"],// supports promises as well
    
    },
  });

  module.exports = {
    cloudinary,
    storage,
  }

  //isko hm listing.js m require kr lenge 9th step