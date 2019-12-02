/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { analyticsActions } from '../../js/actions/index';

class MostViewedTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isElementClicked: false,
      redirectAddress: '',
      dataDoughnut: {
        labels: [],
        datasets: [],
      },
    };
  }

  componentDidMount() {
    const { fetchMostViewedTweet } = this.props;
    fetchMostViewedTweet().then(() => {
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

  elementClicked = element => {
    this.setState({
      isElementClicked: true,
      redirectAddress: `/home/status/${this.props.mostViewedTweetData[element[0]._index].tweetId}`,
    });
  };

  render() {
    let redirectLet = '';
    if (this.state.isElementClicked) {
      redirectLet = <Redirect to={this.state.redirectAddress} />;
    }
    return (
      <MDBContainer>
        {redirectLet}
        <div className="fontChanges">Most Viewed Tweets</div>
        <Doughnut
          data={this.state.dataDoughnut}
          width={400}
          options={{ responsive: true, maintainAspectRatio: true }}
          onElementsClick={this.elementClicked}
        />
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    mostViewedTweetData: state.analytics.mostViewedTweetData,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMostViewedTweet: () => dispatch(analyticsActions.getAnalyticsMostViewedTweets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MostViewedTweets);
