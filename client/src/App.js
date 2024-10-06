// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Environmental from './pages/Environmental';
import Taskwork from './pages/Taskwork';
import Weather from './pages/Weather';
import Navbar from './components/Navbar'; // Import the Navbar component
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navbar /> {/* Include the Navbar */}
        <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
          {/* The main content area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/environmental" element={<Environmental />} />
            <Route path="/taskwork" element={<Taskwork />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
