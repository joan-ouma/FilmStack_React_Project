import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes will go here
app.get("/", (req, res) => {
    res.send("FilmStack API is running...");
});

// Connect to MongoDB and start server
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is missing in .env file");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

connectDB();
