/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TweetDetails.css';
import { FiMessageCircle } from 'react-icons/fi';
import { MdKeyboardBackspace, MdBookmarkBorder } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { tweetActions } from '../../js/actions/index';
import Sidebar from '../Sidebar/Sidebar';

class TweetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '5dcb31841c9d440000b0d332'
    };
  }

  componentDidMount() {
    const data = {
      tweetId: this.props.match.params.tweetID,
    };

    const { getTweetDetails } = this.props;
    getTweetDetails(data);
  }
  likeTweet = param =>(e) => {
    let data ={tweetId:param,userId:this.state.userId}
    this.props.likeTweet(data).then(()=>{
      this.props.getTweetDetails(data);
    })
  }
  
  unlikeTweet = param=>(e) => {
    let data ={tweetId:param,userId:this.state.userId}
    this.props.unlikeTweet(data).then(()=>{
      this.props.getTweetDetails(data);
    })
  }
  
  render() {
    const { tweet } = this.props;
    let myDate = new Date(tweet.created_at);
    myDate = myDate.toString();
    myDate = myDate.split(' ');
    let likeButton;
    console.log(tweet)
    if (tweet.body) {
      likeButton = <FaRegHeart size={20} onClick={this.likeTweet(tweet._id)} />;
      if (tweet.likes.includes(this.state.userId)) {
        likeButton = <FaHeart size={20} style={{ color: 'red' }} onClick={this.unlikeTweet(tweet._id)} />;
      }
    }


    return (
      <div className="flexTweetDetails">
        <Sidebar />
        <div className="tweetDetailsContainer">
          <div className="cardContainer">
            <div className="cardWidth">
              <div className="paperHeight">
                <Link to="/home">
                  <div className="backIcon">
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
                <img src="/images/default_profile_bigger.png" className="profileImage" alt="user" />
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
                {tweet.image ? <img src={tweet.image} alt="Tweet" className="tweetImage" /> : null}
              </div>
            </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tweet: state.tweet.currentTweet,
  };
};

const mapDispatchToProps = dispatch => ({
  getTweetDetails: data => dispatch(tweetActions.getTweetDetails(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetDetails);
