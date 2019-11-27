/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { analyticsActions } from '../../js/actions/index';

class MostViewedTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoughnut: {
        labels: [],
        datasets: [{}],
      },
    };
  }

  componentDidMount() {
    const data = {
      userId: '5dcb31841c9d440000b0d332',
    };
    const { fetchMostViewedTweet } = this.props;
    fetchMostViewedTweet(data).then(() => {
      const yAxis = this.props.mostViewedTweetData.map(element => {
        return element.viewsCount;
      });
      let rankCount = 0;
      const xAxis = this.props.mostViewedTweetData.map(() => {
        rankCount += 1;
        return `Rank ${rankCount}`;
      });

      this.setState({
        dataDoughnut: {
          labels: xAxis,
          datasets: [
            {
              data: yAxis,
              backgroundColor: [
                '#46A2FF',
                '#58ACFF',
                '#6BB5FF',
                '#7DBEFF',
                '#90C7FF',
                '#A2D1FF',
                '#B5DAFF',
                '#C7E3FF',
                '#DAECFF',
                '#ECF6FF',
              ],
            },
          ],
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Most Viewed Tweets</div>
        <Doughnut
          data={this.state.dataDoughnut}
          width={400}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    mostViewedTweetData: state.analytics.mostViewedTweetData,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMostViewedTweet: data => dispatch(analyticsActions.getAnalyticsMostViewedTweets(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostViewedTweets);
