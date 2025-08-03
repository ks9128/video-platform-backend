import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express(); //usd for http req and rsponse

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,  // which fornt end url is allowed to send db requests
            credentials: true
    })
);

//common middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"6kb"}))
app.use(express.static("public"))

app.use(cookieParser())  // add only after creating app = express()  // will store cookies 

// import routes
import heathCheckRouter from "./routes/heathcheck.routes.js"
import userRouter from './routes/user.routes.js'
import { errorHandler } from "./middlewares/error.middlewares.js";

//routes

app.use("/api/v1/healthcheck",heathCheckRouter)
app.use("/api/v1/users",userRouter)

app.use(errorHandler)

export {app}