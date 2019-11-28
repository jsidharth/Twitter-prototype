/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListCard.css';
import { connect } from 'react-redux';

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { list } = this.props;
    const imgSrcSubscribed = list.userPic ? list.userPic : '/images/default_profile_bigger.png';
    return (
      // eslint-disable-next-line no-underscore-dangle
      <div className="listCardWidth" key={list._id}>
        <div className="listCardContent">
          <div className="flexImageUser">
            <div>
              {/* Include user profile image if available */}
              <img src={imgSrcSubscribed} className="listUserCard" alt="user" />
            </div>
            <div>
              <div className="flexNameHandleUserCard">
                <p className="listUserName">{list.userName}</p>
                <p className="listUserHandle">@{list.userHandle}</p>
              </div>
              <p className="listTitle">{list.name}</p>
              <p className="listDescription">{list.description}</p>
              <p className="listMemberCount">{list.members.length} Members</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  userId: state.user.currentUser._id,
});

export default connect(mapStateToProps)(ListCard);
