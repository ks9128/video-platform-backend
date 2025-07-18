import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // ie vitube

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MOngoDb conneced ! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb Connection error", error);
        process.exit(1)
    }
}

export default connectDB;