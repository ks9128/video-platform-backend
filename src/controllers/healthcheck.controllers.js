import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res) => { //asyncHandler is same as try and catch just samller syntax and we dont need to write catch part
    //asunchandler func is there in utils
    return res 
        .status(200)
        .json(new ApiResponse(200, "OK", "Health check passed"))
})

export {healthCheck}