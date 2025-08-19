// allow user for create or login in this website
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);//token's unique id will be added from jwt package
};  

//route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; //if user is not available with any userId then we'll generate a response

        // Check if user exists
        const user = await userModel.findOne({ email });//if any user is available with this email id then that user will be stored in that variable
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate token and send cartData
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            cartData: user.cartData || {}, // return cart
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

//__________Register User___________
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check existing user
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email & password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        //hashing user password
        //salt:It's like adding a secret spice to the password so even if two users have the same password, their stored versions in the database will be different.
        //Hashing = taking a password and turning it into a fixed-length scrambled string that can’t be reversed
        //hashedPassword = safe to store in your database.
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {} //Start with empty cart
        });
        const user = await newUser.save();

        // Generate token and send cartData
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
            cartData: user.cartData || {}, // also return this for consistency
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

// ___________Admin Login ___________
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

export { loginUser, registerUser, adminLogin };
//We’ll use this token to authenticate the admin. To do that, we’ll implement a middleware.