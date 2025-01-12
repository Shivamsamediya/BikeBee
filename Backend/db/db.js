import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB DataBase connected!!`);
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;
