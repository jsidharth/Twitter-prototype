import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';
import TweetDetails from './TweetDetails/TweetDetails';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Switch>
          <Route path="/home/status/:tweetID" component={TweetDetails} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Main;
