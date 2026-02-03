import Moviecard from '../components/moviecard';
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api';
import '../css/home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            }
              finally {
                setLoading(false);
              } 
            }
        loadPopularMovies();
    }, []) ;


    // Search as user types
    useEffect(() => {
        const fetchSearch = async () => {
            if (!searchQuery.trim()) {
                setLoading(true);
                setError(null);
                try {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                } catch (err) {
                    setError("Failed to load movies...");
                } finally {
                    setLoading(false);
                }
                return;
            }
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

    // Remove form submit handler (search is now live)
    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type="text"
                    placeholder="Search movies..."
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            {loading && <div style={{ textAlign: 'center', margin: '2rem' }}>Loading...</div>}
            {error && <div style={{ color: 'red', textAlign: 'center', margin: '2rem' }}>{error}</div>}

            {!loading && !error && movies.length === 0 && (
                <div style={{ textAlign: 'center', margin: '2rem', color: '#888' }}>No movies found.</div>
            )}

            <div className="movies-grid">
                {movies.map((movie) => (
                    <Moviecard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;