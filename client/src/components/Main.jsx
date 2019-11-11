import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/Home';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default Main;
