//it is fully part of 2(d)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({  //we dont need to store username and password it will be automatically stored by passport
    email : {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); //it do automatically username, hashing,salting and hashedpassword store.

module.exports = mongoose.model("User", userSchema);