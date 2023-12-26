import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hotelRoute from "./routes/hotels.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import roomRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";


const app = express();
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
      } catch (error) {
       console.log(error.message)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected from database")
})
mongoose.connection.on("connected", ()=>{
    console.log("connected from database")
})

app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    connect();
    console.log("conected to backend")
})

app.use('/api/hotels',hotelRoute);
app.use('/api/users',authRoute);
app.use('/api/users',userRoute);
app.use('/api/rooms', roomRoute);

app.use((err,req,res,next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"

    return res.status(errStatus).json({
        success: false,
        ststus: errStatus,
        message: errMessage,
        stack : err.stack 
    })
})
