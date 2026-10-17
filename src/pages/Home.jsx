import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page (Route: '/')
 * Includes hero section, short intro, and prominent "See Characters" button
 * navigating to '/characters'.
 */
function Home() {
  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <span className="hero-badge">Interdimensional Catalog</span>
          <h1 className="hero-title">
            <span className="gradient-text">Rick and Morty</span> Explorer
          </h1>
          <p className="hero-description">
            Wubba Lubba Dub-Dub! Venture across infinite dimensions and explore
            hundreds of characters from the Rick and Morty multiverse. View live statuses,
            species origins, planetary locations, and total episode appearances in real time.
          </p>
          <div>
            <Link to="/characters" className="btn btn-primary" id="btn-see-characters">
              See Characters &rarr;
            </Link>
          </div>
        </section>

        {/* Highlight Features for Assignment / Presentation */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛸</div>
            <h2 className="feature-title">800+ Multiverse Entities</h2>
            <p className="feature-text">
              Browse through extensive character data fetched live from the official
              Rick and Morty REST API without any backend or API key needed.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h2 className="feature-title">Real-Time Search & Filters</h2>
            <p className="feature-text">
              Instantly search characters by name and filter by status (Alive, Dead, Unknown)
              with synchronized URL pagination.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧬</div>
            <h2 className="feature-title">Detailed Dossiers</h2>
            <p className="feature-text">
              Inspect origin dimensions, current locations, gender, species classifications,
              and episodic counts for every character.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
