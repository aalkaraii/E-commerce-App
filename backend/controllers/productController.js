import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category_id,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!category_id) {
      return res.json({ success: false, message: "category_id is required" });
    }

    // Verify category exists in the category collection
    const categoryExists = await categoryModel.findById(category_id);
    if (!categoryExists) {
      return res.json({
        success: false,
        message: "Invalid category_id. Category does not exist in the category table.",
      });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category_id,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(
      name,
      description,
      price,
      category_id,
      subCategory,
      sizes,
      bestseller
    );
    console.log(productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list products
const listProducts = async (req, res) => {
  try {
    const { category, subCategory, sort } = req.query;
    let filter = {};

    if (category) {
      const categoryArray = typeof category === "string"
        ? category.split(",").map((c) => c.trim())
        : Array.isArray(category)
        ? category
        : [category];

      // Find matching categories in the category collection
      const matchedCategories = await categoryModel.find({
        name: { $in: categoryArray.map((c) => new RegExp(`^${c}$`, "i")) },
      });

      const categoryIds = matchedCategories.map((cat) => cat._id);
      filter.category_id = { $in: categoryIds };
    }

    if (subCategory) {
      const subCategoryArray = typeof subCategory === "string"
        ? subCategory.split(",").map((s) => s.trim())
        : Array.isArray(subCategory)
        ? subCategory
        : [subCategory];
      filter.subCategory = { $in: subCategoryArray.map((s) => new RegExp(`^${s}$`, "i")) };
    }

    let query = productModel.find(filter).populate("category_id");

    if (sort) {
      if (sort === "low-high") {
        query = query.sort({ price: 1 });
      } else if (sort === "high-low") {
        query = query.sort({ price: -1 });
      }
    }

    const products = await query;

    // Map products to include category string for frontend backward compatibility
    const productsWithCategory = products.map((product) => {
      const p = product.toObject();
      if (p.category_id) {
        p.category = p.category_id.name; // e.g. "men"
      }
      return p;
    });

    res.json({ success: true, products: productsWithCategory });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// finction for removing products
const removeProducts = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// finction for single product info
const singleProducts = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId).populate("category_id");
    if (product) {
      const p = product.toObject();
      if (p.category_id) {
        p.category = p.category_id.name;
      }
      res.json({ success: true, product: p });
      console.log("Received productId:", productId);
    } else {
      res.json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProducts, singleProducts };
