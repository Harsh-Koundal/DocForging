import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("DataBase Connected Successfully");
    }catch(err){
        console.error("DataBase Connection Failed",err.message);
        process.exit(1);
    }
};

export default connectDB; 