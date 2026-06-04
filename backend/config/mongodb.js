import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alkarai:alka123@cluster0.xqrooys.mongodb.net/e-commerce?appName=Cluster0"
      // "mongodb+srv://alkarai:alka123@cluster0.xqrooys.mongodb.net/e-commerce"
    );

    console.log("DB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;
