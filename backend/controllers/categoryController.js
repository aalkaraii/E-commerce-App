import categoryModel from "../models/categoryModel.js";

// Add Category
const addCategory = async (req, res) => {
  try {
    const { name, displayName, description } = req.body;

    if (!name || !displayName) {
      return res.json({ success: false, message: "Name and Display Name are required" });
    }

    const categoryExists = await categoryModel.findOne({ name: name.toLowerCase() });
    if (categoryExists) {
      return res.json({ success: false, message: "Category already exists" });
    }

    const categoryData = {
      name: name.toLowerCase(),
      displayName,
      description,
    };

    const category = new categoryModel(categoryData);
    await category.save();

    res.json({ success: true, message: "Category Added", category });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List Categories
const listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Category
const removeCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await categoryModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Category Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id, name, displayName, description } = req.body;

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    if (name) category.name = name.toLowerCase();
    if (displayName) category.displayName = displayName;
    if (description !== undefined) category.description = description;

    await category.save();
    res.json({ success: true, message: "Category Updated", category });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Single Category Info
const singleCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addCategory,
  listCategories,
  removeCategory,
  updateCategory,
  singleCategory,
};
