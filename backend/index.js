import cors from "cors";
import cookieParser from "cookie-parser";
import express from 'express';
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import travelStoryRoutes from "./routes/travelStory.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", travelStoryRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
