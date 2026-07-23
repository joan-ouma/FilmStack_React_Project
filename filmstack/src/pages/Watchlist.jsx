import { useWatchlist } from "../contexts/WatchlistContext";

function Watchlist() {
    const { watchlist } = useWatchlist();

    if (watchlist.length > 0) {
        return (
            <div className="watchlist-container">
                <h2>Your Curated Collection</h2>
                <div className="movies-grid">
                    {watchlist.map((movie) => (
                        <p key={movie.id}>{movie.title}</p>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="empty-state">
            <h2>No movies saved yet</h2>
            <p>Start adding movies to your list and they will appear here!</p>
        </div>
    );
}

export default Watchlist;
