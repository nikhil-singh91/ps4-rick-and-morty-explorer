import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Rick and Morty Explorer</h1>
      <p>Explore characters, species, and living statuses from the Rick and Morty television series.</p>
      <Link to="/characters">
        <button type="button">See Characters</button>
      </Link>
    </div>
  );
}

export default Home;
