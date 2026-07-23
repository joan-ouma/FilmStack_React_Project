import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">FilmStack</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Discover</Link>
                <Link to="/watchlist" className="nav-link">Watchlist</Link>
            </div>
        </nav>
    );
}

export default NavBar;
