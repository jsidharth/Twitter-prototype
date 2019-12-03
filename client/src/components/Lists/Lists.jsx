/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MdPlaylistAdd } from 'react-icons/md';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../Search/SearchBar';
import { listActions } from '../../js/actions';
import ListCard from './ListCard';
import AddListModal from './AddListModal';
import './Lists.css';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddListModal: false,
    };

    this.showAddListModal = this.showAddListModal.bind(this);
  }

  componentDidMount() {
    const { getLists, match } = this.props;
    getLists(match.params.userId);
  }

  showAddListModal = () => {
    const { showAddListModal } = this.state;
    this.setState({
      showAddListModal: !showAddListModal,
    });
  };

  render() {
    const { lists, userId, match } = this.props;
    const { ownedLists, subscribedLists, listOwner } = lists;
    const { showAddListModal } = this.state;
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">
            <div>Lists</div>
            {match.params.userId === userId ? (
              <div className="newListIcon">
                <MdPlaylistAdd size={25} onClick={this.showAddListModal} />
              </div>
            ) : null}
          </div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="owned"
              transition={false}
              id="profile-tab"
              className="profileTabs"
            >
              <Tab eventKey="owned" title="Owned">
                <div className="resultsTab">
                  {ownedLists && ownedLists.length
                    ? ownedLists.map(list => {
                        list.userPic = listOwner.profilePic;
                        list.userName = listOwner.name;
                        list.userHandle = listOwner.handle;
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
                  {subscribedLists && subscribedLists.length
                    ? subscribedLists.map(list => {
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
        {this.showAddListModal ? (
          <AddListModal
            showAddListModal={this.showAddListModal}
            showAddListModalState={showAddListModal}
          />
        ) : null}
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.list.lists,
  userId: state.user.currentUser._id,
});

const mapDispatchToProps = dispatch => ({
  getLists: data => dispatch(listActions.getLists(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lists);
