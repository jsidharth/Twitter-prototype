/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';
import { connect } from 'react-redux';
import { analyticsActions } from '../../js/actions/index';

class ProfileViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLine: {
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
        dataLine: {
          labels: xAxis,
          datasets: [
            {
              label: 'Number of times my profile was viewed',
              fill: true,
              lineTension: 0.3,
              backgroundColor: 'rgba(225, 204,230, .3)',
              borderColor: '#00acee',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(205, 130,1 58)',
              pointBackgroundColor: 'rgb(255, 255, 255)',
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(0, 0, 0)',
              pointHoverBorderColor: 'rgba(220, 220, 220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: yAxis,
            },
          ],
        },
        lineChartOptions: {
          responsive: true,
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontSize: 20,
                },
                gridLines: {
                  display: false,
                  color: 'rgba(0, 0, 0, 0.1)',
                }
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Views',
                  fontSize: 20,
                }, gridLines: {
                  display: false,
                  color: 'rgba(0, 0, 0, 0.1)',
                }
              },
            ],
          },
          legend: {
            display: false,
          },
        },
      });
    });
  }

  render() {
    return (
      <MDBContainer>
        <div className="fontChanges">Profile views for the last month</div>
        <Line data={this.state.dataLine} options={this.state.lineChartOptions} />
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
)(ProfileViews);
