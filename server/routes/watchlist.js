import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get Watchlist
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch watchlist" });
    }
});

// Add to Watchlist
router.post("/add", verifyToken, async (req, res) => {
    try {
        const movie = req.body;
        const user = await User.findById(req.user.id);
        
        // Prevent duplicates
        if (!user.watchlist.some(m => m.id === movie.id)) {
            user.watchlist.push(movie);
            await user.save();
        }
        res.status(200).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to add to watchlist" });
    }
});

// Remove from Watchlist
router.delete("/remove/:movieId", verifyToken, async (req, res) => {
    try {
        const movieId = parseInt(req.params.movieId);
        const user = await User.findById(req.user.id);
        
        user.watchlist = user.watchlist.filter(m => m.id !== movieId);
        await user.save();
        
        res.status(200).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove from watchlist" });
    }
});

export default router;
