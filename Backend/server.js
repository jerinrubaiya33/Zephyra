import express from 'express' //import the express library for build the server 
import cors from 'cors' // imports cors , which allows your server to accept req from other domain (like frontend) , in one word it's a way of conversation between frontend and backend

import 'dotenv/config' // loads a environment variables from .env (e.g., PORT = 4000)
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//test app config
const app = express() //creates an express app
const port = process.env.PORT || 4000 //Uses the port from .env defaults to 4000 if not set
connectDB() // connects to MongoDB database using the URI from .env
connectCloudinary() // connects to Cloudinary with your cloud name, API key, and secret
//middlewares
app.use(express.json()) //whatever req from express it will pass through the json, tells express to understand JSON in req bodies  
app.use(express.urlencoded({ extended: true }));

//Enable CORS so my frontend (even from another domain) can make request to this server

app.use(cors({
  // origin: ["http://localhost:5173", "https://yourfrontend.vercel.app"],
  // credentials: true
}));


//API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working") // Creates a GET endpoint at / that return 'API Working'
}) //when we will open local port 4000 it will show API Working


//start express server
app.listen(port, () => console.log('Server started on port : ' + port));