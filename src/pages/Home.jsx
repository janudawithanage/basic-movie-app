import Moviecard from '../components/moviecard';
import{ useState } from 'react';
import '../css/home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "Inception", releaseDate: "2010-07-16", poster: "https://example.com/inception.jpg" },
        { id: 2, title: "The Matrix", releaseDate: "1999-03-31", poster: "https://example.com/matrix.jpg" },
        { id: 3, title: "Interstellar", releaseDate: "2014-11-07", poster: "https://example.com/interstellar.jpg" },
    ];

    const handleSearch = (e) => { 
        e.preventDefault();
        alert(searchQuery);
        setSearchQuery( "-");
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
                <button type='submit' className='search-button'>Search</button>
            </form>

            <div className="movies-grid">
                    {movies.map((movie) => (
                        <Moviecard movie={movie} key={movie.id} />
                    
                ))}
        </div>
    </div>
    );
}

export default Home;