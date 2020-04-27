import React from 'react';
import './App.css';
import MarketingIndex from './components/Marketing/index';
import Game from './components/Game/Game'
import RegisterForm from './components/Marketing/RegisterForm'
import LoginForm from './components/Marketing/LoginForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/" component={MarketingIndex} />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/login" component={LoginForm} />
    </Router>

  );
}

export default App;