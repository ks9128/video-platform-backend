import mongoose, { Schema } from "mongoose";

const subscriptionSchema = Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, //who is subscribing
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId, //to whom subscribing
            ref: "User"
        }
    },
    { timestamps: true } //created at and updated at
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema) //use capital U standart practice