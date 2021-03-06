/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { history } from '../../js/helper/history';
import { analyticsActions } from '../../js/actions/index';

class MostViewedTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieOptions: {},
      dataPie: {
        labels: [],
        datasets: [],
      },
    };
  }

  componentDidMount() {
    const { fetchMostRetweetedTweet } = this.props;
    fetchMostRetweetedTweet().then(() => {
      const yAxis = this.props.mostRetweetedTweetData.map(element => {
        return `${element.retweetCount}`;
      });
      let rankCount = 0;
      const xAxis = this.props.mostRetweetedTweetData.map(() => {
        rankCount += 1;
        return `Rank${rankCount}`;
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
        pieOptions: {
          tooltips: {
            callbacks: {
              label(tooltipItems, data) {
                return `${data.labels[tooltipItems.index]} : ${
                  data.datasets[0].data[tooltipItems.index]
                } retweets`;
              },
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
        },
      });
    });
  }

  elementClicked = element => {
    history.push(`/home/status/${this.props.mostRetweetedTweetData[element[0]._index].tweetId}`);
  };

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Most Retweeted Tweets</div>
        <Pie
          data={this.state.dataPie}
          width={400}
          options={this.state.pieOptions}
          onElementsClick={this.elementClicked}
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
  fetchMostRetweetedTweet: () => dispatch(analyticsActions.getMostRetweetedTweets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostViewedTweets);
