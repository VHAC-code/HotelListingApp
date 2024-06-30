module.exports = (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(next);
    };
};

// it is error handling part which is wrap Asyncs and we are adding this wrap asuncs in our main code this 1c part of my project