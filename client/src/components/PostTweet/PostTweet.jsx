/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './PostTweet.css';
import { connect } from 'react-redux';
import { AiOutlinePicture } from 'react-icons/ai';
import { imageActions, tweetActions } from '../../js/actions/index';

class PostTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
    };

    this.tweetTextHandler = this.tweetTextHandler.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.postTweet = this.postTweet.bind(this);
  }

  tweetTextHandler = e => {
    this.setState({
      tweetText: e.target.value,
    });
  };

  uploadImage = () => {
    const data = new FormData();
    const { upload } = this.props;
    if (this.uploadTweetImage.files && this.uploadTweetImage.files.length) {
      data.append('file', this.uploadTweetImage.files[0] || '');
      upload(data);
    }
  };

  postTweet = () => {
    const { tweetText } = this.state;
    const { postTweet, userId, imageUrl, fetchUpdatedFeed  } = this.props;
    if (tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId,
        tweetText,
        imageUrl,
      };
      postTweet(data).then(() => {
        const fetchFeedPayload = {
          userId,
          count: 10,
          offset: 0,
        };
        fetchUpdatedFeed(fetchFeedPayload);
        this.setState({
          tweetText: '',
        });
      });
    }
  };

  render() {
    const { tweetText } = this.state;
    const { imageUrl, user } = this.props;
    const count = 280 - tweetText.length;

    return (
      <div className="cardContainer">
        <div className="cardWidth">
          <div className="paperHeight">Home</div>
          <div className="cardContent">
            <div className="flexImageTweet">
              <div>
                <img
                  src={user.profilePic ? user.profilePic : '/images/default_profile_bigger.png'}
                  className="profileImageTweet"
                  alt="User profile"
                />
              </div>
              <div className="autoExpandDiv">
                <textarea
                  className="textArea"
                  onChange={this.tweetTextHandler}
                  placeholder="What's happening?"
                  maxLength="280"
                  value={tweetText}
                />
              </div>
            </div>
            {imageUrl ? <img src={imageUrl} className="tweetImagePost" alt="Tweet" /> : null}
            <div className="flexUploadTweet">
              <div className="flexIconCharsCount">
                <div className="iconUpload">
                  <input
                    className="inputStyle"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={this.uploadImage}
                    ref={ref => {
                      this.uploadTweetImage = ref;
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <AiOutlinePicture color="#1da1f2" size={20} />
                  </label>
                </div>
                <div className="countMessageStyle">{`${count} characters remaining`}</div>
              </div>
              <button type="button" className="postTweetBtn" onClick={this.postTweet}>
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="postTweetSeparator" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imageUrl: state.image.imageUrl,
  tweetPostedFlag: state.tweet.tweetPostedFlag,
  userId: state.user.currentUser._id,
  user: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  postTweet: data => dispatch(tweetActions.postTweet(data)),
  fetchUpdatedFeed: data => dispatch(tweetActions.fetchUpdatedFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTweet);
