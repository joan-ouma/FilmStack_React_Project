import { createContext, useState, useContext, useEffect } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("my_watchlist");
        if (savedData) setWatchlist(JSON.parse(savedData));
    }, []);

    useEffect(() => {
        localStorage.setItem("my_watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist(prev => [...prev, movie]);
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(prev => prev.filter(m => m.id !== movieId));
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
