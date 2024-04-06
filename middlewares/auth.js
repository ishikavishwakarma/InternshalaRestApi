const jwt = require("jsonwebtoken")

const { catchAsync } = require("./catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = catchAsync(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("please login to access the resource",404))
    }
    const {id}= jwt.verify(token,process.env.JWT_SECRETE)
    req.id = id;
 next()
})