import '../css/Favorites.css';
import { useState, useEffect } from 'react';
import MovieCard from '../components/moviecard';

function Favourites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const loadFavs = () => {
      const favList = JSON.parse(localStorage.getItem('favourites') || '[]');
      setFavs(favList);
    };
    loadFavs();
    window.addEventListener('favouritesUpdated', loadFavs);
    return () => window.removeEventListener('favouritesUpdated', loadFavs);
  }, []);

  if (!favs.length) {
    return <div className="favorites-empty">
      <h2>Your favourites list is empty</h2>
      <p>Add some items to your favourites to see them here.</p>
    </div>;
  }

  return (
    <div className="movies-grid">
      {favs.map(movie => <MovieCard movie={movie} key={movie.id} />)}
    </div>
  );
}

export default Favourites;