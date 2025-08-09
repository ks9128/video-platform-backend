import mongoose, { isValidObjectId, Mongoose } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: toggle like on video
    if (!videoId || videoId.trim() === "") {
        throw new ApiError(404, "videoId is required")
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId id")
    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id
    })
    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res.status(200)
            .json(new ApiResponse(200, "Removed like successfully", { isLiked: false }))
    }
    else {
        await Like.create({
            video: videoId,
            likedBy: req.user?._id,

        })
        return res.status(200)
            .json(new ApiResponse(200, " Like added successfully", { isLiked: true }))
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    //TODO: toggle like on comment
    if (!commentId || commentId.trim() === "") {
        throw new ApiError(404, "commentId is required")
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id
    })
    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res.status(200)
            .json(new ApiResponse(200, "Removed like successfully", { isLiked: false }))
    }
    else {
        await Like.create({
            comment: commentId,
            likedBy: req.user?._id,

        })
        return res.status(200)
            .json(new ApiResponse(200, " Like added successfully", { isLiked: true }))
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    //TODO: toggle like on tweet
    if (!tweetId || videoId.trim() === "") {
        throw new ApiError(404, "tweetId is required")
    }
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id
    })
    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res.status(200)
            .json(new ApiResponse(200, "Removed like successfully", { isLiked: false }))
    }
    else {
        await Like.create({
            tweet: tweetId,
            likedBy: req.user?._id,

        })
        return res.status(200)
            .json(new ApiResponse(200, " Like added successfully", { isLiked: true }))
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: mongoose.Types.ObjectId(req.user?._id),
                video: { $exists: true }
            }
        },
        {
            $lookup: {
                from: 'videos',
                localField: 'video',
                foreignField: '_id',
                as: "videoDetails",

                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'owner',
                            foreignField: '_id',
                            as: 'userDetails',
                        },
                    },
                    { $unwind: '$userDetails' },
                ]
            },
            
        },
        { $unwind: '$videoDetails' },
        {
            $project: {
                _id: "$videoDetails._id",
                title: "$videoDetails.title" ,
                thumbnail:"$videoDetails.thumbnail",
                duration: "$videoDetails.duration" ,
                views: "$videoDetails.views",
                owner: {
                    username: "$videoDetails.userDetails.username",
                    avatar: "$videoDetails.userDetails.avatar",
                }
            }
        }
    ])
    return res
        .status(200)
        .json(
            new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
        );
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}