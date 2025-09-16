import mongoose from "mongoose";

//   This schema defines the structure of a user document in the MongoDB database
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name (must be provided)
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    password: { type: String, required: true }, // Encrypted password (must be provided)
    cartData: { type: Object, default: {} }, // Empty cart by default (for new users)
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { minimize: false });

//    { minimize: false } ensures that empty objects like cartData are still saved.
//    If not used, MongoDB might remove cartData if it's empty, which could cause errors later.
//    This way, we keep the cart field ready even before the user adds products.

//    Create a model (or reuse it if already defined)
//    In development with tools like Nodemon, the file may be imported multiple times.
//    If we try to redefine the same model again, Mongoose throws an error:
//    "Cannot overwrite `user` model once compiled."

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

//    Explanation:
// - `mongoose.models.user`: If the model already exists (due to hot-reload or re-import), reuse it.
// - `mongoose.model('user', userSchema)`: Otherwise, create a new model using the schema.

// This prevents the error and keeps your dev server stable and reusable.

export default userModel;