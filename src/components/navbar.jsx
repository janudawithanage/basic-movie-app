import { Link } from "react-router-dom";
import '../css/navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">movie app</Link>
            </div>
            <div className="navbar-right">
                <div className="navbar-links">
                    <Link to="/browse" className="nav-links">Browse</Link>
                    <Link to="/favourites" className="nav-links">Favourites</Link>
                </div>
                <div className="navbar-profile">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;