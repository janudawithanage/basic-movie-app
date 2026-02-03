import '../css/moviecard.css';
import { useState, useEffect } from 'react';

function MovieCard({ movie }) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        setIsFav(favs.some(f => f.id === movie.id));
    }, [movie.id]);

    function toggleFavourite(e) {
        e.stopPropagation();
        let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        if (isFav) {
            favs = favs.filter(f => f.id !== movie.id);
        } else {
            favs.push(movie);
        }
        localStorage.setItem('favourites', JSON.stringify(favs));
        setIsFav(!isFav);
        window.dispatchEvent(new Event('favouritesUpdated'));
    }

    function onPlayClick() {
        alert('Play feature not implemented');
    }

    return (
        <div className="movie-card">
            <button
                className={`heart-btn${isFav ? ' active' : ''}`}
                onClick={toggleFavourite}
                aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 2,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 0,
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={isFav ? '#ff4757' : 'none'}
                    stroke="#ff4757"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: 'block' }}
                >
                    <path d="M12 21s-6.2-5.3-8.5-8.1C1.7 10.1 2.1 7.1 4.3 5.5c2.2-1.6 5.2-1.1 6.9 1.1C13.5 4.4 16.5 3.9 18.7 5.5c2.2 1.6 2.6 4.6.8 7.4C18.2 15.7 12 21 12 21z" />
                </svg>
            </button>
            <div className="movie-poster">
                <img
                    src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                />
                <div className="movie-overlay">
                    <button
                        className="favorite-btn"
                        onClick={onPlayClick}
                        aria-label="Play trailer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', fontSize: 0 }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.3)" />
                            <polygon points="10,8 16,12 10,16" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date ? movie.release_date.split('-')[0] : ''}</p>
            </div>
        </div>
    );
}

export default MovieCard;