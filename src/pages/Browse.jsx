import Moviecard from '../components/moviecard';
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api';
import '../css/Browse.css';

function Browse() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("latest");

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const popularMovies = await getPopularMovies();
                let result = [...popularMovies];
                if (filter === "latest") {
                    result.sort((a, b) => {
                        if (!a.release_date) return 1;
                        if (!b.release_date) return -1;
                        return new Date(b.release_date) - new Date(a.release_date);
                    });
                }
                setMovies(result);
            } catch (err) {
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        if (!searchQuery.trim()) {
            loadMovies();
        }
    }, [filter, searchQuery]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!searchQuery.trim()) return;
            setLoading(true);
            setError(null);
            try {
                const results = await searchMovies(searchQuery);
                setMovies(results);
            } catch (err) {
                setError("Failed to search movies...");
            } finally {
                setLoading(false);
            }
        };
        fetchSearch();
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="browse">
            <header className="browse-header">
                <h1>Browse Movies</h1>
                <p className="browse-subtitle">Discover thousands of movies. Search, filter, and explore!</p>
            </header>

            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type="text"
                    placeholder="Search movies..."
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search movies"
                />
            </form>

            {!searchQuery.trim() && (
                <div className="filter-buttons">
                    <button
                        className={filter === 'latest' ? 'active' : ''}
                        onClick={() => setFilter('latest')}
                        aria-pressed={filter === 'latest'}
                    >
                        Latest
                    </button>
                    <button
                        className={filter === 'popular' ? 'active' : ''}
                        onClick={() => setFilter('popular')}
                        aria-pressed={filter === 'popular'}
                    >
                        Popular
                    </button>
                </div>
            )}

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !error && movies.length === 0 && (
                <div className="no-movies">No movies found.</div>
            )}

            <div className="movies-grid">
                {movies.map((movie) => (
                    <Moviecard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Browse;