import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  description: { type: String },
});

const categoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
