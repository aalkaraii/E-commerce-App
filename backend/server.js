import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectClaudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import { loginUser } from "./controllers/userController.js";
import productRouter from "./routes/productRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectClaudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.use("/api/user", userRouter);
app.use("/api/login", loginUser);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on port: " + port));
