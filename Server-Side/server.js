import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";

dotenv.config();


const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5020",
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) =>{
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

}

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}



app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes


// Health Route

app.get("/",(req,res)=>{
    res.status(200).json({message:"Server Running"});
})

connectDB();
const port  = process.env.PORT || 5020;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});