// import { v2 as cloudinary } from 'cloudinary'
// import productModel from "../models/productModel.js"

// const addProduct = async (req, res) => {
//   //to add a product we'll add middleware using a multer
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//     const images = req.files || []; // multer puts files here when using upload.array

//     const imageUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, {
//           resource_type: 'image',
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       category,
//       subCategory,
//       price: Number(price),
//       bestseller: bestseller === 'true',
//       sizes: JSON.parse(sizes),
//       image: imageUrl,
//       date: Date.now(),
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: 'Product added' });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// //function for list product
// const listProducts = async (req, res) => {
//   //we'll return all product in one array using that we can display this products in front end
//   try {
//     const products = await productModel.find({})
//     res.json({ success: true, products })
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//   }
// }

// //function for remove product
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({ success: true, message: "Product Removed" })
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//   }
// }

// //function for single product information
// //function for single product information
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body
//     const product = await productModel.findById(productId)
//     res.json({ success: true, product })
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//   } 
// }

// // function to update product discount
// const updateDiscount = async (req, res) => {
//   try {
//     const { productId, discount } = req.body;

//     if (!productId || discount === undefined) {
//       return res.json({ success: false, message: "Product ID and discount are required" });
//     }

//     const product = await productModel.findByIdAndUpdate(
//       productId,
//       { discount: Number(discount) },
//       { new: true }
//     );

//     if (!product) {
//       return res.json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Discount updated", product });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { listProducts, addProduct, removeProduct, singleProduct, updateDiscount }

















// import productModel from "../models/productModel.js";
// import cloudinary from "cloudinary";

// // ========== Add Product ==========
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller, discount } = req.body;
//     const images = req.files || [];

//     // Upload all images to Cloudinary
//     const imageUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       category,
//       subCategory,
//       price: Number(price),
//       bestseller: bestseller === "true",
//       sizes: sizes ? JSON.parse(sizes) : [],
//       image: imageUrl,
//       date: Date.now(),
//       discount: discount ? Number(discount) : 0, // ✅ FIXED
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product added", product });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ========== List Products ==========
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ========== Remove Product ==========
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await productModel.findByIdAndDelete(id);
//     res.json({ success: true, message: "Product removed" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ========== Single Product ==========
// const singleProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await productModel.findById(id);
//     res.json({ success: true, product });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ========== Update Discount ==========
// const updateDiscount = async (req, res) => {
//   try {
//     const { id, discount } = req.body;

//     if (!id || discount === undefined) {
//       return res.json({ success: false, message: "Product ID and discount are required" });
//     }

//     const updatedProduct = await productModel.findByIdAndUpdate(
//       id,
//       { discount: Number(discount) },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, message: "Discount updated", product: updatedProduct });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export { addProduct, listProducts, removeProduct, singleProduct, updateDiscount };
// productController









import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";

// helper function to calculate final price
const calculateFinalPrice = (price, discount) => {
  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(discount) || 0;

  return numericDiscount > 0
    ? +(numericPrice - (numericPrice * numericDiscount) / 100).toFixed(2)
    : numericPrice;
};

const isValidDiscount = (discount) => {
  const numericDiscount = Number(discount) || 0;
  return numericDiscount === 0 || (numericDiscount >= 15 && numericDiscount <= 40);
};

const normalizeProductName = (name = "") =>
  String(name)
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const productDiscountOverrides = {
  "blush pink girls' tee": 15,
  "charcoal men's basic tee": 40,
  "girls round neck cotton top": 30,
  "mustard yellow boy's tee": 7,
  "women zip-front relaxed fit jacket": 50,
  "peach women's summer top": 20,
  "mint retro girls' top": 10,
  "floral print pink women's top": 10,
  "teal women's palazzo pants": 10,
  "rose pink girls' summer top": 30,
  "charcoal slim men's trousers": 5,
};

const getEffectiveDiscount = (product) => {
  const normalizedName = normalizeProductName(product?.name);

  if (Object.prototype.hasOwnProperty.call(productDiscountOverrides, normalizedName)) {
    return productDiscountOverrides[normalizedName];
  }

  return Number(product?.discount) || 0;
};

// ========== Add Product ==========
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, discount } = req.body;
    const images = req.files || [];

    // Upload all images to Cloudinary
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const numericPrice = Number(price);
    const numericDiscount = discount ? Number(discount) : 0;

    if (!isValidDiscount(numericDiscount)) {
      return res.json({
        success: false,
        message: "Discount must be 0 or between 15% and 40%",
      });
    }

    const finalPrice = calculateFinalPrice(numericPrice, numericDiscount);

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: numericPrice,
      bestseller: bestseller === "true",
      sizes: sizes ? JSON.parse(sizes) : [],
      image: imageUrl,
      date: Date.now(),
      discount: numericDiscount,
      finalPrice, // ✅ save finalPrice in DB
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added", product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ========== List Products ==========
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    const updatedProducts = products.map((p) => {
      const numericPrice = Number(p.price);
      const numericDiscount = getEffectiveDiscount(p);
      const finalPrice = calculateFinalPrice(numericPrice, numericDiscount);

      return {
        ...p._doc,
        price: numericPrice,
        discount: numericDiscount,
        finalPrice,
      };
    });

    res.json({ success: true, products: updatedProducts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========== Remove Product ==========
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========== Single Product ==========
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const numericPrice = Number(product.price);
    const numericDiscount = getEffectiveDiscount(product);
    const finalPrice = calculateFinalPrice(numericPrice, numericDiscount);

    res.json({
      success: true,
      product: {
        ...product._doc,
        price: numericPrice,
        discount: numericDiscount,
        finalPrice,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========== Update Discount ==========
const updateDiscount = async (req, res) => {
  try {
    const { id, discount } = req.body;

    if (!id || discount === undefined) {
      return res.json({ success: false, message: "Product ID and discount are required" });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const numericDiscount = Number(discount);

    if (!isValidDiscount(numericDiscount)) {
      return res.json({
        success: false,
        message: "Discount must be 0 or between 15% and 40%",
      });
    }

    const finalPrice = calculateFinalPrice(product.price, numericDiscount);

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { discount: numericDiscount, finalPrice },
      { new: true }
    );

    res.json({ success: true, message: "Discount updated", product: updatedProduct });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateDiscount };
