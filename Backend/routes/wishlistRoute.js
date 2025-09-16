import express from 'express'
import { addToWishlist, getWishlist, removeFromWishlist, syncWishlist } from '../controllers/wishlistController.js'
import authUser from '../middleware/auth.js'
const wishlistRouter = express.Router()

wishlistRouter.post('/get', authUser, getWishlist) // was getUserWishlist
wishlistRouter.post('/add', authUser, addToWishlist)
wishlistRouter.post('/remove', authUser, removeFromWishlist)
wishlistRouter.post('/sync', authUser, syncWishlist)

export default wishlistRouter

