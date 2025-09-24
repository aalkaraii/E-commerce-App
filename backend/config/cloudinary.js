import { v2 as cloudinary } from "cloudinary";
const connectClaudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLAUDINARY_NAME,
    api_key: process.env.CLAUDINARY_API_KEY,
    api_secret: process.env.CLAUDINARY_SECRECT_KEY,
  });
};
export default connectClaudinary;
