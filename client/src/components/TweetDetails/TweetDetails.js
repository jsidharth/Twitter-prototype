/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TweetDetails.css';
import { FiMessageCircle } from 'react-icons/fi';
import { MdKeyboardBackspace, MdBookmarkBorder } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { tweetActions } from '../../js/actions/index';
import Sidebar from '../Sidebar/Sidebar';
import CommentModal from '../CommentModal/CommentModal';
import TweetCard from '../TweetCard/TweetCard';

class TweetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentModal: false,
      tweet: {}
    };
    this.likeTweet = this.likeTweet.bind(this);
    this.unlikeTweet = this.unlikeTweet.bind(this);
    this.bookmarkTweet = this.bookmarkTweet.bind(this);
    this.showCommentModal = this.showCommentModal.bind(this);
  }

  componentDidMount() {
    const data = {
      tweetId: this.props.match.params.tweetID,
    };

    const { getTweetDetails } = this.props;
    getTweetDetails(data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.tweetID !== prevProps.match.params.tweetID) {
      const { getTweetDetails } = this.props;
      const data = {
        tweetId: this.props.match.params.tweetID,
      };
      getTweetDetails(data);
    }
  }

  // Render the tweet detail after a comment has been posted
  componentWillReceiveProps(nextProps) {
    const { tweet } = nextProps;
    this.setState({
      tweet
    });
  }

  likeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.likeTweet(data).then(() => {
      this.props.getTweetDetails(data);
    });
  };

  unlikeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.unlikeTweet(data).then(() => {
      this.props.getTweetDetails(data);
    });
  };

  bookmarkTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.bookmarkTweet(data).then(() => {
      this.props.getTweetDetails(data);
    });
  };

  showCommentModal = () => {
    this.setState({
      showCommentModal: !this.state.showCommentModal,
    });
  };

  render() {
    const { tweet } = this.state;
    const tweetUserId = tweet.userId;
    var myDate;
    var timeValue;
    if (tweet.created_at) {
      myDate = new Date(tweet.created_at);
      myDate = myDate.toString().split(' ');
      timeValue = myDate[4].split(':');
      var time = myDate[4].split(':');
      var date = myDate[1] + ' ' + myDate[2] + ',' + myDate[3];
      time = timeValue[0] + ':' + timeValue[1];
    }

    let likeButton, unlikeButton, renderLikeButton;
    if (tweet.body) {
      likeButton = <FaRegHeart size={20} id={tweet._id} onClick={this.likeTweet} />;
      unlikeButton = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path
            id={tweet._id}
            onClick={this.unlikeTweet}
            d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
          />
        </svg>
      );
      renderLikeButton = tweet.likes.includes(this.props.userId) ? unlikeButton : likeButton;
    }
    const imgSrc = tweet.profilePic ? tweet.profilePic : '/images/default_profile_bigger.png';

    return (
      <div className="flexTweetDetails">
        <Sidebar />
        <div>
          {this.state.showCommentModal ? (
            <CommentModal
              showCommentModal={this.showCommentModal}
              showCommentModalState={this.state.showCommentModal}
              tweetProfilePic={tweet.profilePic}
              tweetUserName={tweet.name}
              tweetUserHandle={tweet.handle}
              tweetDate={date}
              tweetBody={tweet.body}
              tweetUserId={tweetUserId}
              tweetId={tweet._id}
              currentUser={this.props.user}
            />
          ) : null}
          <div className="cardContainer">
            <div className="cardWidth">
              <div className="paperHeight">
                <Link to="/home">
                  <div className="backIconTweetDetails">
                    <MdKeyboardBackspace size={30} />
                  </div>
                </Link>
                Tweet
              </div>
            </div>
          </div>
          <div className="cardContent">
            <div className="flexImageTweet">
              <div>
                {/* Include user profile image if available */}
                <img src={imgSrc} className="profileImageTweetDetails" alt="user" />
              </div>
              <div>
                <div className="flexNameHandle">
                  <p className="tweetUserName">{tweet.name}</p>
                  <p className="tweetUserHandle">@{tweet.handle}</p>
                </div>
                <p className="tweetBody">{tweet.body}</p>
                {tweet.image ? <img src={tweet.image} alt="Tweet" className="tweetImage" /> : null}
              </div>
            </div>
            <div className="flexDateTime">
              <p className="tweetTimeDetails">{time}</p>
              <p className="tweetDateDetails">{date}</p>
            </div>
            <div className="flexCardBtns">
              <div className="flexBtnCnt">
                <FiMessageCircle size={20} onClick={this.showCommentModal} />
                <div>{tweet.comments_count > 0 ? tweet.comments_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <AiOutlineRetweet size={20} />
                <div>{tweet.retweet_count > 0 ? tweet.retweet_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <div>{renderLikeButton}</div>
                <div>{tweet.likes_count > 0 ? tweet.likes_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <MdBookmarkBorder size={20} id={tweet._id} onClick={this.bookmarkTweet} />
              </div>
            </div>
          </div>
          {tweet.comments && tweet.comments.length ? (
            <TweetCard
              tweets={tweet.comments}
              likeTweet={this.likeTweet}
              unlikeTweet={this.unlikeTweet}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweet: state.tweet.currentTweet,
  userId: state.user.currentUser._id,
  user: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getTweetDetails: data => dispatch(tweetActions.getTweetDetails(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
  bookmarkTweet: data => dispatch(tweetActions.bookmarkTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetDetails);
