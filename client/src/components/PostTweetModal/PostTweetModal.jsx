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
      pictures: [],
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

  uploadImage = e => {
    const data = new FormData();
    if (this.upladTweetImage.files && this.upladTweetImage.files.length) {
      data.append('file', this.upladTweetImage.files[0] || '');
      this.props.upload(data);
    }
  };

  postTweet = () => {

    if (this.state.tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId: this.props.userId,
        tweetText: this.state.tweetText,
        imageUrl: this.props.imageUrl,
      };
      this.props.postTweet(data).then(() => {
        this.props.showPostTweetModal();
        this.props.fetchFeed(data);
        this.setState({
          tweetText: '',
        });
      });
    }
  };

  render() {

    var count = 280 - this.state.tweetText.length;
    const { user } = this.props;

    return (
      <Modal
        dialogClassName="commentModal"
        show={this.props.showPostTweetModalState}
        onHide={this.props.showPostTweetModal}
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="flexImageTweet">
            <div>
              <img
                src={user.profilePic ? user.profilePic : "/images/default_profile_bigger.png"}
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
                value={this.state.tweetText}
              ></textarea>
            </div>
          </div>
          {this.props.imageUrl ? (
            <img src={this.props.imageUrl} className="tweetImagePost" alt="Tweet" />
          ) : null}
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
                    this.upladTweetImage = ref;
                  }}
                />
                <label htmlFor="icon-button-file">
                  <AiOutlinePicture color="#1da1f2" size={20} />
                </label>
              </div>
              <div className="countMessageStyle">{`${count} characters remaining`}</div>
            </div>
            <button className="postTweetBtn" onClick={this.postTweet}>
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
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTweetModal);
