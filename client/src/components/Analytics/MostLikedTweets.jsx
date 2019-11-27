/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import { connect } from 'react-redux';
import { analyticsActions } from '../../js/actions/index';

class MostLikedTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBar: {
        labels: [],
        datasets: [],
      },
    };
  }

  componentDidMount() {
    const data = {
      userId: this.props.userId,
    };
    const { fetchMostLikedTweet } = this.props;
    fetchMostLikedTweet(data).then(() => {
      const yAxis = this.props.mostLikedTweetData.map(element => {
        return element.likesCount;
      });
      let rankCount = 0;
      const xAxis = this.props.mostLikedTweetData.map(() => {
        rankCount += 1;
        return `Rank ${rankCount}`;
      });
      this.setState({
        dataBar: {
          labels: xAxis,
          datasets: [
            {
              label: 'Number of Likes',
              data: yAxis,
              backgroundColor: [
                'rgba(70, 162, 255,1)',
                'rgba(88, 172, 255,1)',
                'rgba(107, 185, 255,1)',
                'rgba(125, 190, 255,1)',
                'rgba(144, 199, 255,1)',
                'rgba(162, 209, 255,1)',
                'rgba(181, 218, 255,1)',
                'rgba(199, 227, 255,1)',
                'rgba(218, 236, 255,1)',
                'rgba(236, 246, 255,1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        barChartOptions: {
          responsive: false,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                barPercentage: 0.5,
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Tweets',
                  fontSize: 20,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Likes',
                  fontSize: 20,
                },
                ticks: {
                  beginAtZero: true,
                  precision: 0,
                },
              },
            ],
          },
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Most Liked Tweets</div>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} height={150} />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    mostLikedTweetData: state.analytics.mostLikedTweetData,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMostLikedTweet: data => dispatch(analyticsActions.getMostLikedTweets(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostLikedTweets);
