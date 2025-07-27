import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"



export const verifyJWT = asyncHandler(async (req, _ ,next) => { // _ as we dont need res
    const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ","") // for mobile part

    if(!token){
        throw new ApiError(401, "Unauthorized")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password,-refreshToken")
        if(!user) {
            throw new ApiError(401,"Unauthorized")
        }

        req.user = user  //added the user details to req (this is like also adding more info with req then send to controleer and now this part is called middleware)

        next() //means passing it now to next step like controller //see user.routes line 16 
    } catch (error) {
        throw new ApiError(401,error?.message || 'Invalid access token')
    }
})