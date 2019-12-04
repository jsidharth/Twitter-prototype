/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { AiOutlinePicture } from 'react-icons/ai';
import './CommentModal.css';
import { Link } from 'react-router-dom';
import { imageActions, tweetActions } from '../../js/actions/index';

class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
    };

    this.replyTweet = this.replyTweet.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
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

  replyTweet = () => {
    const { tweetText } = this.state;
    const {
      userId,
      tweetId,
      imageUrl,
      replyTweet,
      showCommentModal,
      fetchUpdatedFeed,
    } = this.props;
    if (tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId,
        parentTweetID: tweetId,
        tweetText,
        imageUrl,
      };
      const { feedOffset, fromFeed } = this.props;
      replyTweet(data).then(() => {
        if (fromFeed) {
          const fetchFeedPayload = {
            userId,
            count: feedOffset || 10,
            offset: 0,
          };
          fetchUpdatedFeed(fetchFeedPayload).then(() => {
            showCommentModal();
          });
        }
      });
    }
  };

  render() {
    const {
      tweetProfilePic,
      tweetUserName,
      tweetUserHandle,
      tweetDate,
      tweetBody,
      tweetUserId,
      currentUser,
      imageUrl,
      showCommentModalState,
      showCommentModal,
    } = this.props;

    const { tweetText } = this.state;

    const count = 280 - tweetText.length;
    return (
      <Modal
        dialogClassName="commentModal"
        show={showCommentModalState}
        onHide={showCommentModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="commentTitle"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="commentModalUserDetails">
            <img
              src={tweetProfilePic || '/images/default_profile_bigger.png'}
              className="profileImageCommentModal"
              alt="profilePic"
            />
            <div className="commentDetailsBody">
              <div className="flexNameHandleCommentModal">
                <p className="tweetUserNameCommentModal">{tweetUserName}</p>
                <p className="tweetUserHandleCommentModal">@{tweetUserHandle}</p>
                <p className="tweetDateDetailsCommentModal">{tweetDate}</p>
              </div>
              <div className="bodyCommentModal">{tweetBody}</div>
              <div className="replyingToCommentModal">
                Replying to{' '}
                <div className="handle">
                  <Link
                    to={`/profile/${tweetUserId}`}
                    key={tweetUserId}
                    className="userClickHandle"
                    style={{ textDecoration: 'none' }}
                  >
                    <div>@</div>
                    {tweetUserHandle}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="tweetReply">
            <img
              src={
                currentUser.profilePic
                  ? currentUser.profilePic
                  : '/images/default_profile_bigger.png'
              }
              alt="profilePic"
              className="profileImageCommentModal"
            />
            <div className="tweetReplyDiv">
              <textarea
                className="textArea"
                onChange={this.tweetTextHandler}
                placeholder="Tweet your reply"
                maxLength="280"
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
              <div className="countMessageStyleComment">{`${count} characters remaining`}</div>
            </div>
            <button
              type="button"
              className={
                !tweetText || tweetText.trim().length === 0
                  ? 'disabledReplyTweetBtn'
                  : 'replyTweetBtn'
              }
              onClick={this.replyTweet}
              disabled={!tweetText || tweetText.trim().length === 0}
            >
              Reply
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  imageUrl: state.image.imageUrl,
  userId: state.user.currentUser._id,
});

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  replyTweet: data => dispatch(tweetActions.replyTweet(data)),
  getTweetDetails: data => dispatch(tweetActions.getTweetDetails(data)),
  fetchUpdatedFeed: data => dispatch(tweetActions.fetchUpdatedFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentModal);
