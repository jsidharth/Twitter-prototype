import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { Card, CardContent, Paper, Icon } from '@material-ui/core';
import { InsertPhoto, ControlCamera } from '@material-ui/icons';
// import { connect } from 'react-redux';
// import { imageActions } from '../../js/actions/index';
import { FiMessageCircle, FiUpload } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import './TweetCard.css';

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mock_data = [
      {
        _id: '5dcb33ef1c9d440000b0d338',
        name: 'Savyasachi J',
        handle: 'savy',
        likes_count: 1,
        comments_count: 0,
        retweet_count: 0,
        body: 'This is another tweet',
        image: '',
        created_at: '2019-11-11T08:00:00.000Z',
      },
      {
        _id: '5dcb33ef1c9d440000b0d338',
        name: 'xyz',
        handle: 'xyz',
        likes_count: 1,
        comments_count: 2,
        retweet_count: 3,
        body: 'This is another tweet by meeee',
        image: '',
        created_at: '2019-11-13T08:00:00.000Z',
      },
    ];

    const feed = mock_data.map(data => {
      var myDate = new Date(data.created_at);
      myDate = myDate.toString();
      myDate = myDate.split(' ');
      console.log(myDate);
      return (
        <Card className="cardWidth">
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
              <div className="flexNameHandle">
              <p className="tweetUserName">{data.name}</p>
              <p className="tweetUserHandle">@{data.handle}</p>
              <p className="tweetUserName">.</p>
              <p className="tweetDate">
                {myDate[1]} {myDate[2]}, {myDate[3]}
              </p>
            </div>
            </div>
            
            <p>{data.body}</p>
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
                <FiUpload size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });

    return <div>{feed}</div>;
  }
}

export default TweetCard;

