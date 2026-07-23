import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">FilmStack</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/watchlist" className="nav-link">Watchlist</Link>
            </div>
        </nav>
    );
}

export default NavBar;