import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB=async()=>{

    if(mongoose.connection.readyState>=1){
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI  )
        console.log("Database connected Successfully")

    } catch (error) {
        console.log("Database connection failed!",error)
        throw error
    }
}


export default connectDB