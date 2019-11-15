import React, { Component } from 'react';
import './PostTweet.css';
import Image from 'react-bootstrap/Image';
import { Card, CardContent, Paper, Icon } from '@material-ui/core';
import { InsertPhoto } from '@material-ui/icons';
import { connect } from 'react-redux';
import { imageActions } from '../../js/actions/index';

class PostTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
      pictures: [],
    };

    this.tweetTextHandler = this.tweetTextHandler.bind(this);
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

  render() {
    console.log(this.props.imageUrl);
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
            <div contentEditable="true" className="autoExpandDiv" data-placeholder="What's happening?"></div>
          </div>
          {this.props.imageUrl ? (
            <img src={this.props.imageUrl} className="tweetImage" alt="Tweet Image" />
          ) : null}
          <div className="flexUploadTweet">
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
            <button className="tweetBtn">Tweet</button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    imageUrl: state.image.imageUrl,
  };
};

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTweet);
