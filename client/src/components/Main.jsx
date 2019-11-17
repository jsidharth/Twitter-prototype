import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/Home';
import Notifications from './Notifications/Notifications';
import Messages from './Messages/Messages';
import Bookmarks from './Bookmarks/Bookmarks';
import Lists from './Lists/Lists';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route exact path="/home" component={Home} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/bookmarks" component={Bookmarks} />
        <Route exact path="/lists" component={Lists} />
      </div>
    );
  }
}

export default Main;
