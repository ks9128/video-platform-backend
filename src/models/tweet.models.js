import mongoose, { Schema } from "mongoose";

const tweetSchema = Schema(
    {
        content: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true } //created at and updated at
);

export const Tweet = mongoose.model("Tweet", tweetSchema) //use capital U standart practice