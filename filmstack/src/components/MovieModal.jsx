import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchMovieTrailer } from "../services/api";

function MovieModal({ movieId, onClose }) {
    const [details, setDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const [movieData, trailerId] = await Promise.all([
                fetchMovieDetails(movieId),
                fetchMovieTrailer(movieId)
            ]);
            setDetails(movieData);
            setTrailerKey(trailerId);
        };
        loadData();
    }, [movieId]);

    if (!details) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glassmorphism" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    {trailerKey ? (
                        <div className="modal-video">
                            <iframe 
                                src={`https://www.youtube.com/embed/${trailerKey}`} 
                                title="Trailer" 
                                frameBorder="0" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="modal-poster">
                            <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} />
                        </div>
                    )}
                    <div className="modal-text">
                        <h2>{details.title}</h2>
                        <p className="modal-tagline">{details.tagline}</p>
                        <div className="modal-meta">
                            <span>⭐ {details.vote_average.toFixed(1)}/10</span>
                            <span>{details.runtime} min</span>
                            <span>{details.release_date.split("-")[0]}</span>
                        </div>
                        <p className="modal-overview">{details.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
