import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body
    
    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    })
    if (!tweet) {
        throw new ApiError(500, "Something went wrong while creating tweet")
    }

    return res.status(200).json(
        new ApiResponse(200, tweet, "Tweet created Successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const tweets = await Tweet.find(
        {
            owner: req.user._id
        }
    )
    if (!tweets) {
        throw new ApiError(500, "Something went wrong while fetching tweets")
    }
    return res.status(200).json(
        new ApiResponse(200, tweets, "Tweets fetched Successfully")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const tweetId = req.params.id
    const {content} = req.body
    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: content
            }
        },{
            new: true
        }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "The tweet updated successfully"))

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const tweetId = req.params.id

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(500, "Something went wrong while fetching tweets")
    }
    await Tweet.findByIdAndDelete(tweetId)
    return res
            .status(200)
            .json(new ApiResponse(200, {}, "The tweet deleted successfully"))

    
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}