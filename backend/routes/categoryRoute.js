import express from "express";
import {
  addCategory,
  listCategories,
  removeCategory,
  updateCategory,
  singleCategory,
} from "../controllers/categoryController.js";
import adminAuth from "../middleware/adminAuth.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", adminAuth, addCategory);
categoryRouter.post("/remove", adminAuth, removeCategory);
categoryRouter.post("/update", adminAuth, updateCategory);
categoryRouter.post("/single", singleCategory);
categoryRouter.get("/list", listCategories);

export default categoryRouter;
