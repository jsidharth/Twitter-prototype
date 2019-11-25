/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { MdBookmarkBorder } from 'react-icons/md';
import './TweetCard.css';

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '5dcb31841c9d440000b0d332' };
  }

  render() {
    const { tweets } = this.props;
    const renderFeed = tweets.map(tweet => {
      let myDate = new Date(tweet.created_at);
      myDate = myDate.toString();
      myDate = myDate.split(' ');
      let likeButton = <FaRegHeart size={20} onClick={this.props.likeTweet(tweet._id)} />;
      if (tweet.likes.includes(this.state.userId)) {
        likeButton = <FaHeart size={20} style={{ color: 'red' }} onClick={this.props.unlikeTweet(tweet._id)} />

      }

      return (
        // eslint-disable-next-line no-underscore-dangle

        <div className="cardWidth" key={tweet._id}>
          <div className="cardContentTweet">
            <Link
              to={`/home/status/${tweet._id}`}
              key={tweet._id}
              className="tweetClickCard"
              style={{ textDecoration: 'none' }}
            >
              <div className="flexImageTweet">
                <div>
                  {/* Include user profile image if available */}
                  <img
                    src="/images/default_profile_bigger.png"
                    className="profileImageTweet"
                    alt="user"
                  />
                </div>
                <div>
                  <div className="flexNameHandle">
                    <p className="tweetUserName">{tweet.name}</p>
                    <p className="tweetUserHandle">@{tweet.handle}</p>
                    <p className="tweetUserName">.</p>
                    <p className="tweetDate">
                      {myDate[1]} {myDate[2]}, {myDate[3]}
                    </p>
                  </div>
                  <p>{tweet.body}</p>
                  {tweet.image ? (
                    <img src={tweet.image} alt="Tweet" className="tweetImage" />
                  ) : null}
                </div>
              </div>
            </Link>

            <div className="flexCardBtns">
              <div className="flexBtnCnt">
                <FiMessageCircle size={20} />
                <div>{tweet.comments_count > 0 ? tweet.comments_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <AiOutlineRetweet size={20} />
                <div>{tweet.retweet_count > 0 ? tweet.retweet_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <div>{likeButton}</div>
                <div>{tweet.likes_count > 0 ? tweet.likes_count : null}</div>
              </div>
              <div className="flexBtnCnt">
                <MdBookmarkBorder size={20} />
              </div>
            </div>
          </div>
        </div>
      );
    });
    return <div>{renderFeed}</div>;
  }
}

export default TweetCard;
