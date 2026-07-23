import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const { token } = useAuth();

    // Load watchlist depending on auth state
    useEffect(() => {
        const loadWatchlist = async () => {
            if (token) {
                try {
                    const res = await fetch("http://localhost:5000/api/watchlist", {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setWatchlist(data);
                    }
                } catch (error) {
                    console.error("Failed to load synced watchlist", error);
                }
            } else {
                // Fallback to local storage
                const savedData = localStorage.getItem("my_watchlist");
                if (savedData) setWatchlist(JSON.parse(savedData));
                else setWatchlist([]);
            }
        };
        
        loadWatchlist();
    }, [token]);

    // Save locally if not logged in
    useEffect(() => {
        if (!token) {
            localStorage.setItem("my_watchlist", JSON.stringify(watchlist));
        }
    }, [watchlist, token]);

    const addToWatchlist = async (movie) => {
        if (token) {
            try {
                const res = await fetch("http://localhost:5000/api/watchlist/add", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(movie)
                });
                if (res.ok) {
                    const data = await res.json();
                    setWatchlist(data);
                }
            } catch (error) {
                console.error("Failed to sync add", error);
            }
        } else {
            setWatchlist(prev => [...prev, movie]);
        }
    };

    const removeFromWatchlist = async (movieId) => {
        if (token) {
            try {
                const res = await fetch(`http://localhost:5000/api/watchlist/remove/${movieId}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setWatchlist(data);
                }
            } catch (error) {
                console.error("Failed to sync remove", error);
            }
        } else {
            setWatchlist(prev => prev.filter(m => m.id !== movieId));
        }
    };

    const isQueued = (movieId) => {
        return watchlist.some(m => m.id === movieId);
    };

    const contextValues = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isQueued
    };

    return (
        <WatchlistContext.Provider value={contextValues}>
            {children}
        </WatchlistContext.Provider>
    );
};
