import { useEffect, useState } from "react";
import { fetchPopularFilms, searchFilms, fetchGenres, fetchFilmsByGenre } from "../services/api";
import FilmCard from "../components/FilmCard";

function Discover() {
    const [films, setFilms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [popular, genreList] = await Promise.all([
                    fetchPopularFilms(),
                    fetchGenres()
                ]);
                setFilms(popular || []);
                setGenres(genreList || []);
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setActiveGenre(null);
        try {
            const results = await searchFilms(searchQuery);
            setFilms(results || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenreClick = async (genreId) => {
        setActiveGenre(genreId);
        setSearchQuery("");
        try {
            if (genreId === null) {
                const popular = await fetchPopularFilms();
                setFilms(popular || []);
            } else {
                const results = await fetchFilmsByGenre(genreId);
                setFilms(results || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="discover-container">
            <h2>Discover Movies</h2>
            
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="genre-pills">
                <button 
                    className={`genre-pill ${activeGenre === null ? "active" : ""}`}
                    onClick={() => handleGenreClick(null)}
                >
                    All
                </button>
                {genres.map(genre => (
                    <button 
                        key={genre.id}
                        className={`genre-pill ${activeGenre === genre.id ? "active" : ""}`}
                        onClick={() => handleGenreClick(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            <div className="films-grid">
                {films.map(film => (
                    <FilmCard key={film.id} film={film} genresMap={genres} />
                ))}
            </div>
        </div>
    );
}

export default Discover;
