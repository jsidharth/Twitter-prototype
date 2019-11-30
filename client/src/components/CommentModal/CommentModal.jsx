import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
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

    uploadImage = e => {
        const data = new FormData();
        if (this.upladTweetImage.files && this.upladTweetImage.files.length) {
            data.append('file', this.upladTweetImage.files[0] || '');
            this.props.upload(data);
        }
    };

    replyTweet = e => {
        if (this.state.tweetText.length > 280) {
            console.log('max length exceeded');
        } else {
            const data = {
                userId: this.props.userId,
                parentTweetID: this.props.tweetId,
                tweetText: this.state.tweetText,
                imageUrl: this.props.imageUrl,
            };
            this.props.replyTweet(data);
            this.props.showCommentModal();
        }
    }

    render() {

        const { tweetProfilePic, tweetUserName, tweetUserHandle, tweetDate, tweetBody, tweetUserId, currentUser, tweetId } = this.props;

        var count = 280 - this.state.tweetText.length;
        return (
            <Modal
                dialogClassName="commentModal"
                show={this.props.showCommentModalState}
                onHide={this.props.showCommentModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="commentTitle"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="commentModalUserDetails">
                        <img src={tweetProfilePic ? tweetProfilePic : '/images/default_profile_bigger.png'} className="profileImageCommentModal" />
                        <div className="commentDetailsBody">
                            <div className="flexNameHandleCommentModal">
                                <p className="tweetUserNameCommentModal">{tweetUserName}</p>
                                <p className="tweetUserHandleCommentModal">@{tweetUserHandle}</p>
                                <p className="tweetUserNameCommentModal">.</p>
                                <p className="tweetDateDetailsCommentModal">
                                    {tweetDate}
                                </p>
                            </div>
                            <div className="bodyCommentModal">
                                {tweetBody}
                            </div>
                            <div className="replyingToCommentModal">
                                Replying to <div className="handle">
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
                        <img src={currentUser.profilePic ? currentUser.profilePic : '/images/default_profile_bigger.png'} className="profileImageCommentModal" />
                        <div className="tweetReplyDiv">
                            <textarea
                                className="textArea"
                                onChange={this.tweetTextHandler}
                                placeholder="Tweet your reply"
                                maxLength="280"
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
                            <div className="countMessageStyleComment">{`${count} characters remaining`}</div>
                        </div>
                        <button className="replyTweetBtn" onClick={this.replyTweet}>
                            Reply
                    </button>
                    </div>
                </Modal.Body>
            </Modal>)
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentModal);