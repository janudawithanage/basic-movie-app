import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrendingMovies } from '../services/api';
import '../css/LandingPage.css';

function LandingPage() {
    const [email, setEmail] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const movies = await getTrendingMovies();
                setTrendingMovies(movies.slice(0, 10));
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const handleGetStarted = (e) => {
        e.preventDefault();
        navigate('/browse');
    };

    const faqs = [
        { question: 'What is MovieApp?', answer: 'MovieApp is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.' },
        { question: 'How can I browse movies?', answer: 'Simply click "Get Started" to access our browse page where you can search for movies, filter by latest or popular, and discover new content every day.' },
        { question: 'Where can I watch?', answer: 'Watch anywhere, anytime. Sign in with your MovieApp account to watch instantly on the web at movieapp.com from your personal computer or on any internet-connected device.' },
        { question: 'Can I save my favorite movies?', answer: 'Yes! You can easily add movies to your favorites list and access them anytime from your favorites page. Your preferences are saved automatically.' },
        { question: 'What can I watch on MovieApp?', answer: 'MovieApp has an extensive library of feature films, documentaries, TV shows, anime, award-winning MovieApp originals, and more. Watch as much as you want, anytime you want.' },
        { question: 'Is MovieApp good for kids?', answer: 'The MovieApp Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.' }
    ];

    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <div className="landing-page">
            {/* Header */}
            <nav className="navbar landing-header">
                <div className="navbar-brand">
                    <a href="/" style={{ color: '#e50914', textDecoration: 'none' }}>movie app</a>
                </div>
                <div className="navbar-right">
                    <div className="navbar-profile">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">movie app</h1>
                    <h2 className="hero-subtitle">Unlimited movies, TV shows, and more</h2>
                    <p className="hero-cta-text">Ready to watch? Enter your email to create or restart your membership.</p>
                    <form className="hero-form" onSubmit={handleGetStarted}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="hero-email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="hero-get-started-btn">
                            Get Started &gt;
                        </button>
                    </form>
                </div>
            </section>

            {/* Trending Now Section */}
            <section className="trending-section">
                <h2>Trending Now</h2>
                {loading ? (
                    <div className="trending-loading">Loading trending movies...</div>
                ) : (
                    <div className="trending-grid">
                        {trendingMovies.map((movie, index) => (
                            <div key={movie.id} className="trending-card">
                                <div className="trending-rank">{index + 1}</div>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="trending-poster"
                                    />
                                )}
                                <div className="trending-title">{movie.title}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* More Reasons to Join Section */}
            <section className="reasons-section">
                <h2>More Reasons to Join</h2>
                <div className="reasons-grid">
                    <div className="reason-card">
                        <h3>Enjoy on your TV</h3>
                        <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    <div className="reason-card">
                        <h3>Download your shows to watch offline</h3>
                        <p>Save your favorites easily and always have something to watch.</p>
                    </div>
                    <div className="reason-card">
                        <h3>Watch everywhere</h3>
                        <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>
                    <div className="reason-card">
                        <h3>Create profiles for kids</h3>
                        <p>Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                            >
                                {faq.question}
                                <span className="faq-icon">{openFAQ === index ? '×' : '+'}</span>
                            </button>
                            {openFAQ === index && (
                                <div className="faq-answer">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="faq-cta">
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form className="hero-form" onSubmit={handleGetStarted}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="hero-email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="hero-get-started-btn">
                            Get Started &gt;
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <p>Questions? Contact us.</p>
                    <div className="footer-links">
                        <div className="footer-column">
                            <a href="#faq">FAQ</a>
                            <a href="#help">Help Center</a>
                            <a href="#account">Account</a>
                        </div>
                        <div className="footer-column">
                            <a href="#media">Media Center</a>
                            <a href="#investor">Investor Relations</a>
                            <a href="#jobs">Jobs</a>
                        </div>
                        <div className="footer-column">
                            <a href="#watch">Ways to Watch</a>
                            <a href="#terms">Terms of Use</a>
                            <a href="#privacy">Privacy</a>
                        </div>
                        <div className="footer-column">
                            <a href="#cookies">Cookie Preferences</a>
                            <a href="#corporate">Corporate Information</a>
                            <a href="#contact">Contact Us</a>
                        </div>
                        <div className="footer-column">
                            <a href="#speed">Speed Test</a>
                            <a href="#legal">Legal Notices</a>
                            <a href="#only">Only on MovieApp</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <select className="language-selector">
                            <option>English</option>
                            <option>Sinhala</option>
                            <option>Tamil</option>
                        </select>
                        <p className="footer-country">movieapp Sri Lanka</p>
                        <div className="footer-privacy">
                            <small>
                                Your privacy and security are our top priority. We use advanced encryption and secure technologies to protect your data and provide a safe experience for all users.
                                <a href="/privacy" style={{ color: "#e50914", marginLeft: "4px" }}>Learn more</a>.
                            </small>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
