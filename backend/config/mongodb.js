import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alkarai:alka123@cluster0.xqrooys.mongodb.net/e-commerce?appName=Cluster0"
      // "mongodb+srv://alkarai:alka123@cluster0.xqrooys.mongodb.net/e-commerce"
    );

    console.log("DB connected");

    // Seed categories if database is empty or missing displayName
    const hasDisplayName = await categoryModel.findOne({ displayName: { $exists: true } });
    if (!hasDisplayName) {
      await categoryModel.deleteMany({});
      const defaultCategories = [
        { name: "men", displayName: "Men", description: "Men's collection" },
        { name: "women", displayName: "Women", description: "Women's collection" },
        { name: "kids", displayName: "Kids", description: "Kids' collection" },
      ];
      await categoryModel.insertMany(defaultCategories);
      console.log("Categories seeded successfully with name and displayName!");
    }

    // Migrate existing products from "category" string to "category_id" ObjectId
    const productsToMigrate = await productModel.find({ category_id: { $exists: false } });
    if (productsToMigrate.length > 0) {
      console.log(`Found ${productsToMigrate.length} products to migrate category field...`);
      for (const product of productsToMigrate) {
        const categoryName = product.category || "men";
        const cat = await categoryModel.findOne({
          name: new RegExp(`^${categoryName}$`, "i")
        });
        if (cat) {
          product.category_id = cat._id;
          await product.save();
        } else {
          const defaultCat = await categoryModel.findOne({ name: "men" });
          if (defaultCat) {
            product.category_id = defaultCat._id;
            await product.save();
          }
        }
      }
      console.log("Product category migration completed!");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;
