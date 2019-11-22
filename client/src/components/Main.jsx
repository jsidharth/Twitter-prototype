import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default Main;
