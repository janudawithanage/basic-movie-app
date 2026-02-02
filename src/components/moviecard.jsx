import '../css/moviecard.css';

function MovieCard({movie}) {

    function onPlayClick() {
        alert
    }

    return (
  
  <div className="movie-card">
  
        <div className="movie-poster">
            <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
             <div className="movie-overlay">
                <button className="favorite-btn" onClick={onPlayClick}>Play</button>
            </div>
        </div>

        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date.split("-")[0]}</p>
        </div>
  
    </div>
  );
}

export default MovieCard;