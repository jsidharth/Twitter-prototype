/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { MdBookmarkBorder } from 'react-icons/md';
import './TweetCard.css';
import { tweetActions } from '../../js/actions/index';

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb31841c9d440000b0d332',
    };
    const { fetchFeed } = this.props;
    fetchFeed(data);
  }

  render() {
    const { feed } = this.props;

    const renderFeed = feed.map(data => {
      let myDate = new Date(data.created_at);
      myDate = myDate.toString();
      myDate = myDate.split(' ');
      return (
        // eslint-disable-next-line no-underscore-dangle
        <Link to={`/home/status/${data._id}`} key={data._id} className="tweetClickCard" style={{textDecoration: "none"}}>
          <div className="cardWidth" key={data._id}>
            <div className="cardContent">
              <div className="flexImageTweet">
                <div>
                  {/* Include user profile image if available */}
                  <img
                    src="/images/default_profile_bigger.png"
                    className="profileImage"
                    alt="user"
                  />
                </div>
                <div>
                  <div className="flexNameHandle">
                    <p className="tweetUserName">{data.name}</p>
                    <p className="tweetUserHandle">@{data.handle}</p>
                    <p className="tweetUserName">.</p>
                    <p className="tweetDate">
                      {myDate[1]} {myDate[2]}, {myDate[3]}
                    </p>
                  </div>
                  <p>{data.body}</p>
                  {data.image ? <img src={data.image} alt="Tweet" className="tweetImage" /> : null}
                </div>
              </div>
              <div className="flexCardBtns">
                <div className="flexBtnCnt">
                  <FiMessageCircle size={20} />
                  <div>{data.comments_count > 0 ? data.comments_count : null}</div>
                </div>
                <div className="flexBtnCnt">
                  <AiOutlineRetweet size={20} />
                  <div>{data.retweet_count > 0 ? data.retweet_count : null}</div>
                </div>
                <div className="flexBtnCnt">
                  <FaRegHeart size={20} />
                  <div>{data.likes_count > 0 ? data.likes_count : null}</div>
                </div>
                <div className="flexBtnCnt">
                  <MdBookmarkBorder size={20} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return <div>{renderFeed}</div>;
  }
}

const mapStateToProps = state => {
  return {
    feed: state.tweet.feed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetCard);
