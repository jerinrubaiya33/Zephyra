import { v2 as cloudinary } from 'cloudinary'
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
  //to add a product we'll add middleware using a multer
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const images = req.files || []; // multer puts files here when using upload.array

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === 'true',
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//function for list product
const listProducts = async (req, res) => {
  //we'll return all product in one array using that we can display this products in front end
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//function for single product information
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { listProducts, addProduct, removeProduct, singleProduct }