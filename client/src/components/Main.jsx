/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../privateRoute';
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
import ListView from './Lists/ListView';

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
          <PrivateRoute path="/home/status/:tweetID" component={TweetDetails} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/bookmarks" component={Bookmarks} />
          <PrivateRoute path="/messages" component={Messages} />
          <PrivateRoute path="/lists/:userId" component={Lists} />
          <PrivateRoute path="/list/view/:listId" component={ListView} />
          <PrivateRoute path="/profile/:userId" component={Profile} />
          <PrivateRoute path="/analytics" component={Analytics} />
          <PrivateRoute path="/search" component={SearchResults} />
          <PrivateRoute path="/follow" component={Follow} />
        </Switch>
      </div>
    );
  }
}

export default Main;
