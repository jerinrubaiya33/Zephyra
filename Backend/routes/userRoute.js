import express from 'express'// Imports Express, a framework for building APIs and web servers
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
//Imports 3 controller functions from another file:
//registerUser: for signing up new users
//loginUser: for logging in existing users
//adminLogin: for logging in as an admin
//These functions handle the actual logic, like checking passwords, saving users to DB, etc.
const userRouter = express.Router();//Creates a new Express router just for user-related routes.

userRouter.post('/register', registerUser)//When someone sends a POST request to /register, it will call the registerUser function. Used for creating a new user account.
userRouter.post('/login', loginUser)//Handles user login — checks email & password, returns a token if valid.
userRouter.post('/admin', adminLogin)//Logs in an admin user (maybe with a special role or separate logic).

export default userRouter; //Exports the router so it can be used in your main server file (Server.js)