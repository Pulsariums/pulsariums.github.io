import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Background from './components/Background';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen relative text-white selection:bg-pulsar-500 selection:text-white">
        {/* Animated Starfield Background */}
        <Background />
        
        {/* Main Content Overlay */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;