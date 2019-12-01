/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../Search/SearchBar';
import TweetCard from '../TweetCard/TweetCard';
import { listActions, tweetActions } from '../../js/actions';
import './ListView.css';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      members: [],
      subscribers: [],
      listOwner: {},
      listDetail: {},
      mouseHoverClassName: 'followingBtn',
      mouseHoverButtonText: 'Subscribed',
    };
  }

  componentDidMount() {
    this.props.getListDetails(this.props.match.params.listId);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { tweets, members, subscribers, listOwner, listDetail } = nextProps.currentList;
    this.setState({
      tweets,
      members,
      subscribers,
      listOwner,
      listDetail,
    });
  }

  likeTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.likeTweet(data).then(() => {
      this.props.getListDetails(this.props.match.params.listId);
    });
  };

  unlikeTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.unlikeTweet(data).then(() => {
      this.props.getListDetails(this.props.match.params.listId);
    });
  };

  bookmarkTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.bookmarkTweet(data).then(() => {
      this.props.getListDetails(this.props.match.params.listId);
    });
  };

  retweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.retweet(data).then(() => {
      this.props.getListDetails(this.props.match.params.listId);
    });
  };

  subscribe = () => {
    const payload = { listId: this.props.match.params.listId, userId: this.props.userId };
    this.props.subscribe(payload);
  };

  unsubscribe = () => {
    const payload = { listId: this.props.match.params.listId, userId: this.props.userId };
    this.props.unsubscribe(payload);
  };

  mouseIn = () => {
    this.setState({ mouseHoverClassName: 'followingBtnRed', mouseHoverButtonText: 'Unsubscribe' });
  };

  mouseOut = () => {
    this.setState({ mouseHoverClassName: 'followingBtn', mouseHoverButtonText: 'Subscribed' });
  };

  render() {
    const { tweets, members, subscribers, listOwner, listDetail } = this.state;

    let renderButton = '';
    let isSubscribed = false;
    if (this.props.subscribedLists) {
      this.props.subscribedLists.forEach(element => {
        if (element === this.props.match.params.listId) {
          isSubscribed = true;
        }
      });
      if (this.props.userId === listOwner._id) {
        renderButton = '';
      } else if (isSubscribed) {
        renderButton = (
          <button
            type="button"
            onMouseEnter={this.mouseIn}
            onMouseLeave={this.mouseOut}
            className={this.state.mouseHoverClassName}
            onClick={this.unsubscribe}
          >
            {this.state.mouseHoverButtonText}
          </button>
        );
      } else {
        renderButton = (
          <button type="button" className="followBtn" onClick={this.subscribe}>
            Subscribe
          </button>
        );
      }
    }

    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Lists</div>
          <div className="listCardContent">
            <div className="flexListDetail">
              <p className="listTitle">{listDetail.name}</p>
              <p className="listDescription">{listDetail.description}</p>
              <div className="flexImageUser">
                <div>
                  <img
                    src={listOwner.profilePic || '/images/default_profile.png'}
                    className="listUserCard"
                    alt="user"
                  />
                </div>
                <div>
                  <div className="flexNameHandleUserCard">
                    <p className="listUserName">{listOwner.name}</p>
                    <p className="listUserHandle">@{listOwner.handle}</p>
                  </div>
                </div>
              </div>
              <div className="flexImageUser">
                <p className="listMemberCount">{members.length} Members</p>
                <p className="listMemberCount">{subscribers.length} Subscribers</p>
              </div>
              <div>{renderButton}</div>
            </div>
          </div>
          <TweetCard
            tweets={tweets}
            likeTweet={this.likeTweet}
            unlikeTweet={this.unlikeTweet}
            deleteTweet={this.deleteTweet}
            bookmarkTweet={this.bookmarkTweet}
            retweet={this.retweet}
          />
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.list.listDetails,
  userId: state.user.currentUser._id,
  subscribedLists: state.user.currentUser.subscribedLists,
});

const mapDispatchToProps = dispatch => ({
  getListDetails: data => dispatch(listActions.getListDetails(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
  deleteTweet: data => dispatch(tweetActions.deleteTweet(data)),
  bookmarkTweet: data => dispatch(tweetActions.bookmarkTweet(data)),
  retweet: data => dispatch(tweetActions.retweet(data)),
  subscribe: data => dispatch(listActions.subscribeList(data)),
  unsubscribe: data => dispatch(listActions.unsubscribeList(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListView);
