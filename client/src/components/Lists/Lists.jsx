/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../Search/SearchBar';
import { listActions } from '../../js/actions';
import ListCard from './ListCard';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getLists } = this.props;
    getLists(this.props.currentUser._id);
  }

  render() {
    const { lists, currentUser } = this.props;
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Lists</div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="owned"
              transition={false}
              id="profile-tab"
              className="profileTabs"
            >
              {/* Change the API for correct data */}
              <Tab eventKey="owned" title="Owned">
                <div className="resultsTab">
                  {lists.ownedLists && lists.ownedLists.length
                    ? lists.ownedLists.map(list => {
                        list.userPic = currentUser.profilePic;
                        list.userName = currentUser.name;
                        list.userHandle = currentUser.handle;
                        return (
                          <div>
                            <ListCard list={list} />
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
              <Tab eventKey="subscribed" title="Subscribed">
                <div className="resultsTab">
                  {lists.subscribedLists && lists.subscribedLists.length
                    ? lists.subscribedLists.map(list => {
                        return (
                          <div className="profileTweets">
                            <ListCard list={list} />
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.list.lists,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getLists: data => dispatch(listActions.getLists(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lists);
