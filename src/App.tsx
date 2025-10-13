import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Questionnaire } from './components/Questionnaire';
import { Results } from './components/Results';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Questionnaire />} />
          <Route path="/vyhodnoceni" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
