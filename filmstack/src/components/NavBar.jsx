import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">FilmStack</Link>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                {user ? (
                    <>
                        <Link to="/watchlist" className="nav-link">Watchlist</Link>
                        <button onClick={handleLogout} className="nav-link" style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
