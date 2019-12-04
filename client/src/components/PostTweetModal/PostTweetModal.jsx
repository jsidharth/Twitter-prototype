/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { AiOutlinePicture } from 'react-icons/ai';
import { imageActions, tweetActions } from '../../js/actions/index';
import './PostTweetModal.css';

class PostTweetModal extends Component {
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
    const { upload } = this.props;
    const data = new FormData();
    if (this.uploadTweetImage.files && this.uploadTweetImage.files.length) {
      data.append('file', this.uploadTweetImage.files[0] || '');
      upload(data);
    }
  };

  postTweet = () => {
    const { tweetText } = this.state;
    const { postTweet, userId, imageUrl, showPostTweetModal, fetchUpdatedFeed } = this.props;
    if (tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId,
        tweetText,
        imageUrl,
      };
      postTweet(data).then(() => {
        showPostTweetModal();
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
    const { imageUrl, showPostTweetModalState, showPostTweetModal, user } = this.props;
    const count = 280 - tweetText.length;

    return (
      <Modal
        dialogClassName="commentModal"
        show={showPostTweetModalState}
        onHide={showPostTweetModal}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="flexImageTweet">
            <div>
              <img
                src={user.profilePic ? user.profilePic : '/images/default_profile_bigger.png'}
                className="profileImageTweet"
                alt="User profile"
              />
            </div>

            <div className="postTweetModalTextArea">
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
            <button
              type="button"
              className={
                !tweetText || tweetText.trim().length === 0
                  ? 'disabledPostTweetBtn'
                  : 'postTweetBtn'
              }
              onClick={this.postTweet}
              disabled={!tweetText || tweetText.trim().length === 0}
            >
              Tweet
            </button>
          </div>
        </Modal.Body>
      </Modal>
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
)(PostTweetModal);
