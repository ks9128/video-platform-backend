import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteFromCloundinary, uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const filter= {}
    if(query){
        filter.$or = [
            {title: {$regex: query, $options: "i"}},
            {description: {$regex: query, $options: "i"}}
        ]
    }
    if(userId){
        filter.owner = userId
    }

    const skip = (page-1) * limit

    const sort = {}
    sort[sortBy || "createdAt"] = sortType === "desc" ?-1: 1

    const videos = await Video.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)

        //total no of matching videos 
        const total = await Video.countDocuments(filter);

        return res.status(200).json(
            new ApiResponse(200, {total,videos}, "videos fetched successfully"))
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video
    if([title,description].some((field)=> field?.trim() === "")){
        throw new ApiError(400,"All fields are required (title and description)")
    }
    
    const thumbnailPath = req.files?.thumbnail[0]?.path;
    const videoPath = req.files?.video[0].path;

    if(!thumbnailPath){
        throw new ApiError(404,"Thumbnail path not found")
    }
    if(!videoPath){
        throw new ApiError(404,"Video path not found")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailPath);
    const videoFile = await uploadOnCloudinary(videoPath);
    
    if (!thumbnail) {
        throw new ApiError(400, "thumbnail path file is required")
    }
    if (!videoFile) {
        throw new ApiError(400, "videoFile is required")
    }
    const duration = videoFile?.duration


    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        isPublished: true,
        owner: req.user._id,
        views: 0,
        duration,

    })

    if (!video) {
        throw new ApiError(500, "Something went wrong while publishing video")
    }

    return res.status(201).json(
        new ApiResponse(200, video, "Video published is Successfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video ID format");
    }


    const video = await Video.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(videoId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",

                }
            },
            {
                $addFields: {
                    owner: {
                        $first: "$owner"
                    }
                }
            }
        ]
    )

    if (!video.length) {
        throw new ApiError(404, "the video not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                video[0],
                "video fetched successfully"
            )
        )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail
    if(!mongoose.Types.ObjectId.isValid(videoId)){
         throw new ApiError(400,"invalid video id")
    }
    const {title,description} = req.body
    let thumbnailPath = req.files?.thumbnail[0].path



    if(!title || !description ||!thumbnailPath){
        throw new ApiError(400,"All fields are required")
    }

    const newthumbnail = await uploadOnCloudinary(thumbnailPath)

    if(!newthumbnail.url) {
        throw new ApiError(404,"THumbnail url not found")
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                thumbnail: newthumbnail.url,
                title,
                description
            }
        },
        {new: true}
    )
    return res
        .status(200)
        .json(new ApiResponse(200,video,"The video details updated successfully"))
    

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "video not found")
    }

    await deleteFromCloundinary(video.thumbnail)
    await deleteFromCloundinary(video.videoFile)

    await Video.findByIdAndDelete(videoId)

    return res.status(200)
                .json(new ApiResponse(200,{}, "The video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    const currvid = await Video.findById(videoId);
    if(!currvid){
        throw new ApiError(404,"video not found")
    }
    
    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !currvid.isPublished
            }
        },
        {new: true}
    )

    return res
        .status(200)
        .json(new ApiResponse(200, video, "The video status toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}