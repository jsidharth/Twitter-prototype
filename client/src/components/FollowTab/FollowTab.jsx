/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Tabs, Tab } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import UserCard from '../UserCard/UserCard';
import SearchBar from '../Search/SearchBar';

import './FollowTab.css';

class Follower extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { followers, following, userId } = this.props;
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeightForFollowers">
            <Link to={`/profile/${userId}`}>
              <div className="backIcon">
                <MdKeyboardBackspace size={30} />
              </div>
            </Link>
            <div className="flexFollowTopPane">
              {/* Change the values to Current user */}
              <div className="usernameFollowTab">Madhu</div>
              <div className="handleFollowTab">@Madhu</div>
            </div>
          </div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="followers"
              transition={false}
              id="follow-tab"
              className="followTabs"
            >
              <Tab eventKey="followers" title="Followers">
                <div className="followerTab">
                  {followers && followers.length
                    ? followers.map(follower => {
                        return (
                          <div>
                            <UserCard user={follower} long />
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
              <Tab eventKey="following" title="Following">
                <div className="followingTab">
                  {following && following.length
                    ? following.map(follower => {
                        return (
                          <div>
                            <UserCard user={follower} long />
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  followers: state.user.profile.followers,
  following: state.user.profile.following,
  userId: state.user.profile._id,
});

export default connect(mapStateToProps)(Follower);
