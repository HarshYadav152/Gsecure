import mongoose from "mongoose";

const connectingtoDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/gsecure`)
        console.log(`MongoDB connected At HOST :: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to MONGODB : ",error);
        process.exit(1);
    }
}

export default connectingtoDB;