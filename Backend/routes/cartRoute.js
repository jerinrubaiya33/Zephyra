import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

//using the express server we'll create the router
const cartRouter = express.Router()

// { addToCart, getUserCart, updateCart } using this functions we'll create multiple endpoints

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter