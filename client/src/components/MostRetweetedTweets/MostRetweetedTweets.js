/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { analyticsActions } from '../../js/actions/index';

class MostViewedTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPie: {
        labels: [],
        datasets: [{}],
      },
    };
  }

  componentDidMount() {
    const data = {
      userId: this.props.userId,
    };
    const { fetchMostRetweetedTweet } = this.props;
    fetchMostRetweetedTweet(data).then(() => {
      const yAxis = this.props.mostRetweetedTweetData.map(element => {
        return element.retweetCount;
      });
      let rankCount = 0;
      const xAxis = this.props.mostRetweetedTweetData.map(() => {
        rankCount += 1;
        return `Rank ${rankCount}`;
      });

      this.setState({
        dataPie: {
          labels: xAxis,
          datasets: [
            {
              data: yAxis,
              backgroundColor: ['#46A2FF', '#6BB5FF', '#90C7FF', '#B5DAFF', '#ECF6FF'],
            },
          ],
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Most Retweeted Tweets</div>
        <Pie
          data={this.state.dataPie}
          width={400}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    mostRetweetedTweetData: state.analytics.mostRetweetedTweetData,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMostRetweetedTweet: data => dispatch(analyticsActions.getMostRetweetedTweets(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostViewedTweets);
