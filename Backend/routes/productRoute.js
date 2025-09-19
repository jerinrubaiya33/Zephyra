import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, updateDiscount } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

//to create this router
const productRouter = express.Router();

productRouter.post(
  '/add',
  adminAuth,
  upload.array('image', 4), //accept up to 4 images under "image"
  addProduct
);

productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

//new route
productRouter.post('/update-discount', adminAuth, updateDiscount);

export default productRouter;