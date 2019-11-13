import React, { Component } from 'react';
import './PostTweet.css';
import Image from 'react-bootstrap/Image';
import ImageUploader from 'react-images-upload';
import { Card, CardContent, Paper, IconButton, Icon } from '@material-ui/core';

import { InsertPhoto } from '@material-ui/icons';

class PostTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
    };

    this.tweetTextHandler = this.tweetTextHandler.bind(this);
  }

  tweetTextHandler = e => {
    this.setState({
      tweetText: e.target.value,
    });
  };

  render() {
    return (
      <Card className="cardWidth">
        <Paper className="paperHeight">Home</Paper>
        <CardContent className="cardContent">
          <div className="flexImageTweet">
            <div>
              <Image
                src="/images/default_profile_bigger.png"
                roundedCircle
                className="profileImage"
              />
            </div>
            <textarea
              type="text"
              className="textField"
              name="description"
              placeholder="What's happening?"
              onChange={this.tweetTextHandler}
            />
          </div>
          <div className="flexUploadTweet">
            <div className="iconUpload">
              <input accept="image/*" id="icon-button-file" type="file" />
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

export default PostTweet;
