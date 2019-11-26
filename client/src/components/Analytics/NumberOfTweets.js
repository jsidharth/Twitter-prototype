/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import { connect } from 'react-redux';
import { analyticsActions } from '../../js/actions/index';

class NumberOfTweets extends Component {
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
    const { fetchProfileViewsPerDay } = this.props;
    fetchProfileViewsPerDay(data).then(() => {
      const xAxis = this.props.viewsPerDayData.map(element => {
        return element.date;
      });
      const yAxis = this.props.viewsPerDayData.map(element => {
        return element.profileViewCount;
      });
      this.setState({
        dataDoughnut: {
          labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
          datasets: [
            {
              data: [300, 50, 100, 40, 120],
              backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
              hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
            },
          ],
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Most Viewed Tweets</h3>
        <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    viewsPerDayData: state.analytics.viewsPerDayData,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfileViewsPerDay: data => dispatch(analyticsActions.getAnalyticsProfileViewsPerDay(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NumberOfTweets);
