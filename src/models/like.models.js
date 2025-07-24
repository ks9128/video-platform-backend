import mongoose, { Schema } from "mongoose";

const likeSchema = Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Commment"
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true } //created at and updated at
);

export const Like = mongoose.model("Like", likeSchema) //use capital U standart practice