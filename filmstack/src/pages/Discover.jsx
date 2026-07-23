import { useEffect, useState } from "react";
import { fetchPopularFilms, searchFilms } from "../services/api";
import FilmCard from "../components/FilmCard";

function Discover() {
    const [films, setFilms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadPopular = async () => {
            try {
                const popular = await fetchPopularFilms();
                setFilms(popular || []);
            } catch (error) {
                console.error(error);
            }
        };
        loadPopular();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        try {
            const results = await searchFilms(searchQuery);
            setFilms(results || []);
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
            <div className="movies-grid">
                {films.map(film => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    );
}

export default Discover;
