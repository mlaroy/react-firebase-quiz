import React from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import HighScores from './components/HighScores';
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/game" component={Game} />
        <Route path="/high-scores" component={HighScores} />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
