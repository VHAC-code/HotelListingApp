class ExpressError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;

//now we wre using concept of express error in this code which we are using after wrapAsyncs function error handling