/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, long } = this.props;
    const styleCardContent = long ? 'followCardContent' : 'userCardContent';
    const styleCardWidth = long ? 'followCardWidth' : 'userCardWidth';
    const imgSrc = user.profilePic ? user.profilePic : '/images/default_profile_bigger.png';
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Link
        to={`/profile/${user._id}`}
        key={user._id}
        className="userClickCard"
        style={{ textDecoration: 'none' }}
      >
        <div className={styleCardWidth} key={user._id}>
          <div className={styleCardContent}>
            <div className="flexImageUser">
              <div>
                {/* Include user profile image if available */}
                <img src={imgSrc} className="userProfileImageCard" alt="user" />
              </div>
              <div>
                <div className="flexNameHandleUserCard">
                  <p className="userCardUserName">{user.name}</p>
                  <p className="userCardUserHandle">@{user.handle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default UserCard;
