import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';
import NotFound from './pages/NotFound';

/**
 * Main Application Component
 * Configures client-side routing using React Router's BrowserRouter.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar accessible across all pages */}
        <Navbar />

        {/* Main Content & Route Definitions */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Route 1: Home Page */}
            <Route path="/" element={<Home />} />

            {/* Route 2: Characters Directory with Search & Pagination */}
            <Route path="/characters" element={<Characters />} />

            {/* Route 3: Character Details by ID */}
            <Route path="/characters/:id" element={<CharacterDetails />} />

            {/* Route 4: 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Application Footer */}
        <footer className="footer">
          <div className="container">
            <p>
              Assignment 5 — PS4: Rick and Morty Explorer | Data provided by{' '}
              <a 
                href="https://rickandmortyapi.com/" 
                target="_blank" 
                rel="noreferrer"
              >
                The Rick and Morty API
              </a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
