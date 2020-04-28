import React from 'react';
import './App.css';
import MarketingIndex from './components/Marketing/index';
import About from './components/Marketing/About';
import Game from './components/Game/Game';
import RegisterForm from './components/Marketing/RegisterForm';
import LoginForm from './components/Marketing/LoginForm';
import PrivateRoute from './components/privateRoute';
import UnPrivateRoute from './components/unPrivateRoute';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Route path="/" component={MarketingIndex} />
      <UnPrivateRoute path='/about' component={About} />
      <UnPrivateRoute exact path="/register" component={RegisterForm} />
      <UnPrivateRoute exact path="/login" component={LoginForm} />
      <PrivateRoute exact path="/game" component={Game}/>
    </Router>

  );
}

export default App;
