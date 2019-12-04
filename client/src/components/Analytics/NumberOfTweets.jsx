/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import { connect } from 'react-redux';
import { analyticsActions } from '../../js/actions/index';

class NumberOfTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPie: {
        labels: [],
        datasets: [],
      },
    };
  }

  componentDidMount() {
    const { fetchNumberOfTweets } = this.props;
    fetchNumberOfTweets().then(() => {
      const xAxis = this.props.numberOfTweetsData.map(element => {
        return element.timeFrame;
      });

      const yAxis = this.props.numberOfTweetsData.map(element => {
        return element.tweetCount;
      });

      this.setState({
        dataPie: {
          labels: xAxis,
          datasets: [
            {
              data: yAxis,
              backgroundColor: [
                'rgba(218, 236, 255,1)',
                'rgba(144, 199, 255,1)',
                'rgba(70, 162, 255,1)',
              ],
            },
          ],
        },
        polarOption: {
          responsive: true,
          scale: {
            display: true,
          },
          tooltips: {
            callbacks: {
              label(tooltipItems, data) {
                return `${data.labels[tooltipItems.index]} : ${
                  data.datasets[0].data[tooltipItems.index]
                } tweets`;
              },
            },
          },
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Number of Tweets(Hour/Day/Month)</div>
        <Polar data={this.state.dataPie} options={this.state.polarOption} width={400} />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    numberOfTweetsData: state.analytics.numberOfTweetsData,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchNumberOfTweets: () => dispatch(analyticsActions.getNumberOfTweets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NumberOfTweets);
