// to store the data in database , using MongoDB to store product data, user info, orders, etc. It's your backbone database for the backend.
//mongoose -  translator between JavaScript code and the MongoDB database
import mongoose from "mongoose";
//schema is structure using that we create the data and data base
//A schema defines the structure of documents in MongoDB
const productSchema = new mongoose.Schema({
    name: {type:String, required:true}, //by requiring true data will save in database
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},
    subCategory: {type:String, required:true},
    sizes: {type:Array, required:true},
    bestseller: {type:Boolean},
    date: {type:Number, required:true},
    discount: { type: Number, default: 0 },
})



//using this schema we'll create a model
const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel