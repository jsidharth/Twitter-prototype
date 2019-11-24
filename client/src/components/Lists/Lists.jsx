import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Lists.css';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Lists</div>
        </div>
      </div>
    );
  }
}

export default Lists;
