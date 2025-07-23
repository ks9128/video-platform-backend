import mongoose, { Schema } from "mongoose";

const playlistSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        desciption: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        videos: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        },],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true } //created at and updated at
);

export const Playlist = mongoose.model("Playlist", playlistSchema) //use capital U standart practice