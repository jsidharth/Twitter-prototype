/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineRetweet, AiOutlineDelete } from 'react-icons/ai';
import { MdBookmarkBorder } from 'react-icons/md';
import CommentModal from '../CommentModal/CommentModal';
import './TweetCard.css';

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentModal: false,
      tweetForComment: {},
    };
    this.showCommentModal = this.showCommentModal.bind(this);
    this.transformDate = this.transformDate.bind(this);
  }

  showCommentModal = tweet => {
    const { showCommentModal } = this.state;
    this.setState({
      showCommentModal: !showCommentModal,
      tweetForComment: tweet,
    });
  };

  transformDate = dateCreated => {
    let myDate = new Date(dateCreated);
    myDate = myDate.toString();
    myDate = myDate.split(' ');
    const date = `${myDate[1]} ${myDate[2]},${myDate[3]}`;
    return date;
  };

  render() {
    const { tweets, userId, feedOffset, feedCount, fromFeed } = this.props;
    const { tweetForComment } = this.state;
    const renderFeed = tweets.map(tweet => {
      let myDate = new Date(tweet.created_at);
      myDate = myDate.toString();
      myDate = myDate.split(' ');
      const date = `${myDate[1]} ${myDate[2]},${myDate[3]}`;
      const imgSrc = tweet.profilePic ? tweet.profilePic : '/images/default_profile_bigger.png';
      const likeButton = <FaRegHeart size={20} id={tweet._id} onClick={this.props.likeTweet} />;

      const unlikeButton = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path
            id={tweet._id}
            onClick={this.props.unlikeTweet}
            d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
          />
        </svg>
      );

      const renderLikeButton = tweet.likes.includes(userId) ? unlikeButton : likeButton;

      // const bookmarkButton = <MdBookmarkBorder size={25} id={tweet._id} onClick={this.props.bookmarkTweet}/>;
      // const bookmarkedAlreadyButton = <MdBookmark size={25} color="#1da1f2" />;

      // const renderBookmarkButton = bookmarks.includes(tweet._id) ? bookmarkedAlreadyButton : bookmarkButton;

      return (
        <div className="cardWidth" key={tweet._id}>
          <div className="cardContentTweet">
            {this.state.showCommentModal ? (
              <CommentModal
                showCommentModal={this.showCommentModal}
                showCommentModalState={this.state.showCommentModal}
                tweetProfilePic={tweetForComment.profilePic}
                tweetUserName={tweetForComment.name}
                tweetUserHandle={tweetForComment.handle}
                tweetDate={this.transformDate(tweetForComment.created_at)}
                tweetBody={tweetForComment.body}
                tweetUserId={tweetForComment.userId}
                tweetId={tweetForComment._id}
                currentUser={this.props.user}
                feedOffset={feedOffset}
                feedCount={feedCount}
                fromFeed={fromFeed}
              />
            ) : null}
            {tweet.retweet ? (
              <div className="flexRetweet">
                <p className="retweetIcon">
                  <AiOutlineRetweet />
                </p>
                <p className="retweetName">{tweet.retweet.name}</p>
                <p className="retweetName">retweeted</p>
              </div>
            ) : null}
            <Link
              to={`/home/status/${tweet._id}`}
              key={tweet._id}
              className="tweetClickCard"
              style={{ textDecoration: 'none' }}
            >
              <div className="flexImageTweet">
                <div>
                  <img src={imgSrc} className="profileImageTweet" alt="user" />
                </div>
                <div>
                  <div className="flexNameHandle">
                    <p className="tweetUserName">{tweet.name}</p>
                    <p className="tweetUserHandle">@{tweet.handle}</p>
                    <p className="tweetDate1">{date}</p>
                  </div>
                  <p className="tweetBody">{tweet.body}</p>
                  {tweet.image ? (
                    <img src={tweet.image} alt="Tweet" className="tweetImage" />
                  ) : null}
                </div>
              </div>
            </Link>
            <div className="flexCardBtns">
              <div className="flexBtnCnt">
                <FiMessageCircle
                  size={20}
                  value={tweet}
                  onClick={() => this.showCommentModal(tweet)}
                />
                <div>{tweet.comments_count > 0 ? tweet.comments_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <AiOutlineRetweet size={20} id={tweet._id} onClick={this.props.retweet} />
                <div>{tweet.retweet_count > 0 ? tweet.retweet_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <div>{renderLikeButton}</div>
                <div>{tweet.likes_count > 0 ? tweet.likes_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <MdBookmarkBorder size={20} id={tweet._id} onClick={this.props.bookmarkTweet} />
                {/* {renderBookmarkButton} */}
              </div>
              {tweet.userId === userId ? (
                <div className="flexBtnCnt">
                  <AiOutlineDelete
                    size={20}
                    color="red"
                    id={tweet._id}
                    onClick={this.props.deleteTweet}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
    return <div>{renderFeed}</div>;
  }
}
const mapStateToProps = state => ({
  userId: state.user.currentUser._id,
  user: state.user.currentUser,
  // bookmarkedTweets: state.tweet.bookmarkedTweets,
});
export default connect(mapStateToProps)(TweetCard);
