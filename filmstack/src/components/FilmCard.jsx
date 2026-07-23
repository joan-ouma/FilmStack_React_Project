import { useState } from "react";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieModal from "./MovieModal";

function FilmCard({ film, genresMap = [] }) {
    const [showModal, setShowModal] = useState(false);
    const { isQueued, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const onWatchlist = isQueued(film.id);

    function handleCardClick() {
        setShowModal(true);
    }

    function handleLike(e) {
        e.preventDefault();
        e.stopPropagation(); // prevent opening modal
        if (onWatchlist) removeFromWatchlist(film.id);
        else addToWatchlist(film);
    }

    const movieGenres = film.genre_ids 
        ? genresMap.filter(g => film.genre_ids.includes(g.id)).slice(0, 2)
        : [];

    return (
        <>
        <div className="film-card" onClick={handleCardClick} style={{cursor: "pointer"}}>
            <div className="film-poster">
                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
                <div className="film-overlay">
                    <button className={`like-btn ${onWatchlist ? "active" : ""}`} onClick={handleLike}>
                        {onWatchlist ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="film-info">
                <h3>{film.title}</h3>
                <div className="film-badges">
                    {movieGenres.map(g => (
                        <span key={g.id} className="genre-badge">{g.name}</span>
                    ))}
                </div>
                <p>{film.release_date?.split("-")[0]}</p>
            </div>
        </div>
        {showModal && <MovieModal movieId={film.id} onClose={() => setShowModal(false)} />}
        </>
    );
}

export default FilmCard;
