import mongoose from "mongoose";

const connectDB = async () =>{
    mongoose.connection.on('connected' , () =>{
        console.log("DB Connected");
    })
    // for connect mongoose db server
    await mongoose.connect(`${process.env.MONGODB_URI}/zephyra`)
}

export default connectDB;