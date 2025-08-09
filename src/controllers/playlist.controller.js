import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!name || !description || name.trim() === "" || description.trim() === ""){
        throw new ApiError(404,"Name and description are required")
    }

    //TODO: create playlist
    const playlist = await Playlist.create(
        {
            name,
            description,
            owner: req.user._id,
        }
    )

    if(!playlist){
        throw new ApiError(400, "Playlist  not found")
    }

    return res.status(200)
        .json( new ApiResponse(200,playlist,"Playlist created successfully"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if (!userId || userId.trim() === "") {
        throw new ApiError(404, "userid is required")
    }
    if (!isValidObjectId(userId)){
        throw new ApiError(400,"Invalid user id")
    }

    const playlist = Playlist.find({owner: userId})

    return res.status(200)
        .json(new ApiResponse(200, playlist, "Playlist fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if (!playlist || playlist.trim() === "") {
        throw new ApiError(404, "playlist is required")
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = Playlist.findById({ playlistId })

    return res.status(200)
        .json(new ApiResponse(200, playlist, "Playlist fetched successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if (!playlistId || !videoId || playlistId.trim() === "" || videoId.trim() === "") {
        throw new ApiError(404, "playlist and video id are required")
    }
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist id or video id")
    }

    const playlist = await Playlist.findById(playlistId)
    const video = await Video.findById(videoId)

    if (!playlist) {
        throw new ApiError(400, "Playlist  not found")
    }
    if (!video) {
        throw new ApiError(400, "Playlist  not found")
    }
    //check authorization
    if(playlist.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "YOu are not authorized for to add video")
    }
    //dublicate check
    if(playlist.videos.includes(videoId)){
        throw new ApiError(400,"Video already exist in playlist")
    }
    //add video 
    const updatedplaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: {
                videos: videoId
            }
        },
        { new: true}
    )

    return res.status(200)
        .json(new ApiResponse(200, updatedplaylist, "video added in playlist successfully"))



})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if (!playlistId || !videoId || playlistId.trim() === "" || videoId.trim() === "") {
        throw new ApiError(404, "playlist and video id are required")
    }
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist id or video id")
    }

    const playlist = await Playlist.findById(playlistId)
    const video = await Video.findById(videoId)

    if (!playlist) {
        throw new ApiError(400, "Playlist  not found")
    }
    if (!video) {
        throw new ApiError(400, "Playlist  not found")
    }
    //check authorization
    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "YOu are not authorized to remove video")
    }
    //dublicate check
    if (!playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video does not exist in playlist")
    }
    //remove video 
    const updatedplaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId
            }
        },
        { new: true }
    )

    return res.status(200)
        .json(new ApiResponse(200, updatedplaylist, "video removed from playlist successfully"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if (!playlistId || playlistId.trim() === "") {
        throw new ApiError(404, "Playlist id is required")
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(400, "Playlist  not found")
    }
    //check authorization
    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "YOu are not authorized to delete this playlist")
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)

    return res.status(200)
        .json(new ApiResponse(200, deletedPlaylist, " playlist deleted successfully"))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if (!playlistId || !name || !description || playlistId.trim() === "" || name.trim() === "" || description.trim() === "") {
        throw new ApiError(404, "playlist id, name and description are required")
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id ")
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(400, "Playlist  not found")
    }
    //check authorization
    if (playlist.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "YOu are not authorized for to update this playlist")
    }
    
    //update playlist
    const updatedplaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name,
                description
            }
        },
        { new: true }
    )

    return res.status(200)
        .json(new ApiResponse(200, updatedplaylist, " playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
