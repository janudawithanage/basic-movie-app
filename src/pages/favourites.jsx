import '../css/Favorites.css';
import { useContext } from 'react';
import MovieCard from '../components/moviecard';
import MovieContext from '../contexts/moviecontext';

function Favourites() {
  const { favourites } = useContext(MovieContext);

  return (
    <div className="favorites">
      <header className="favorites-header">
        <h1>Your Favourites</h1>
        <p className="favorites-subtitle">All your saved movies in one place.</p>
      </header>

      {!favourites.length ? (
        <div className="favorites-empty">
          <h2>Your favourites list is empty</h2>
          <p>Add some items to your favourites to see them here.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favourites.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </div>
      )}
    </div>
  );
}

export default Favourites;