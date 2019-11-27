/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';
import Messages from './Messages/Messages';
import Lists from './Lists/Lists';
import TweetDetails from './TweetDetails/TweetDetails';
import Bookmarks from './Bookmarks/Bookmarks';
import Profile from './Profile/Profile';
import Analytics from './Analytics/Analytics';
import SearchResults from './Search/SearchResults';
import Follow from './FollowTab/FollowTab';

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
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/messages" component={Messages} />
          <Route path="/lists" component={Lists} />
          <Route path="/profile" component={Profile} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/search" component={SearchResults}/>
          <Route path="/follow" component={Follow} />
        </Switch>
      </div>
    );
  }
}

export default Main;
