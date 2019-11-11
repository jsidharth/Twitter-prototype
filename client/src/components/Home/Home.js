import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default Home;
