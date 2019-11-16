import React, { Component } from 'react';
import './PostTweet.css';
import Image from 'react-bootstrap/Image';
import { Card, CardContent, Paper, Icon } from '@material-ui/core';
import { InsertPhoto } from '@material-ui/icons';
import { connect } from 'react-redux';
import { imageActions, tweetActions } from '../../js/actions/index';

class PostTweet extends Component {
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
    // change userId

    if (this.state.tweetText.length > 280) {
      console.log('max length exceeded');
    } else {
      const data = {
        userId: '5dcb31841c9d440000b0d332',
        tweetText: this.state.tweetText,
        imageUrl: this.props.imageUrl,
      };
      console.log(data);
      this.props.postTweet(data);
    }
  };

  render() {
    var count = 280 - this.state.tweetText.length;

    return (
      <Card className="cardWidth">
        <Paper className="paperHeight">Home</Paper>
        <CardContent className="cardContent">
          <div className="flexImageTweet">
            <div>
              {/* Include user profile image if available */}
              <Image
                src="/images/default_profile_bigger.png"
                roundedCircle
                className="profileImage"
              />
            </div>

            <div className="autoExpandDiv">
              <textarea
                className="textArea"
                onChange={this.tweetTextHandler}
                placeholder="What's happening?"
              ></textarea>
            </div>
          </div>

          {this.props.imageUrl ? (
            <img src={this.props.imageUrl} className="tweetImage" alt="Tweet Image" />
          ) : null}
          <div className="flexUploadTweet">
            <div className="flexIconCharsCount">
              <div className="iconUpload">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={this.uploadImage}
                  ref={ref => {
                    this.upladTweetImage = ref;
                  }}
                />
                <label htmlFor="icon-button-file">
                  <Icon color="primary">
                    <InsertPhoto />
                  </Icon>
                </label>
              </div>
              <div className="countStyle">{`${count} characters remaining`}</div>
            </div>
            <button className="postTweetBtn" onClick={this.postTweet}>
              Tweet
            </button>
            <input
              type="text"
              name="tweetText"
              onChange={this.tweetTextHandler}
              required
              maxlength="280"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    imageUrl: state.image.imageUrl,
    tweetPostedFlag: state.tweet.tweetPostedFlag,
  };
};

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  postTweet: data => dispatch(tweetActions.postTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTweet);
