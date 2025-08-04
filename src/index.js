

import dotenv from 'dotenv'
import { app } from "./app.js";
import connectDB from './db/index.js';

dotenv.config({
    path: ".env"  //tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
})          

const PORT = process.env.PORT || 8002


connectDB()
    .then( ()=>{ //if successful
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })})
    .catch((err) =>{
        console.log("MOngoDb connection error",err)
    }
    )