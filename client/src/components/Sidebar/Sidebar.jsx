/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Navbar, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoHome, GoMail, GoNote, GoGraph } from 'react-icons/go';
import { FiBookmark, FiLogOut } from 'react-icons/fi';
import cookie from 'js-cookie';
import './Sidebar.css';
// import StickyBox from 'react-sticky-box';
import Sticky from 'react-sticky-el';
import PostTweetModal from '../PostTweetModal/PostTweetModal';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostTweetModal: false,
    };

    this.showPostTweetModal = this.showPostTweetModal.bind(this);
  }

  handleSignout = e => {
    e.preventDefault();
    cookie.remove('token');
    localStorage.clear();
    window.location.href = '/';
  };

  showPostTweetModal = () => {
    this.setState({
      showPostTweetModal: !this.state.showPostTweetModal,
    });
  };

  render() {
    const { userId } = this.props;
    return (
      // <StickyBox>
      <Sticky>
        <div>
          <div>
            <nav className="sidebar">
              <ListGroup variant="flush">
                <div>
                  <ListGroup.Item>
                    <Link to="/home">
                      <Navbar.Brand>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png"
                          width="45px"
                          height="35px"
                          className="d-inline-block align-top"
                          alt="Main logo link to home"
                        />
                      </Navbar.Brand>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to="/home">
                      <div className="flexSidebars">
                        <GoHome size={30} />
                        <p className="sidebarTopics">Home</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to="/messages">
                      <div className="flexSidebars">
                        <GoMail size={30} />
                        <p className="sidebarTopics">Messages</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to="/bookmarks">
                      <div className="flexSidebars">
                        <FiBookmark size={30} />
                        <p className="sidebarTopics">Bookmarks</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to={`/lists/${userId}`}>
                      <div className="flexSidebars">
                        <GoNote size={30} />
                        <p className="sidebarTopics">Lists</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to={`/profile/${userId}`}>
                      <div className="flexSidebars">
                        <FaRegUserCircle size={30} />
                        <p className="sidebarTopics">Profile</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <Link to="/analytics">
                      <div className="flexSidebars">
                        <GoGraph size={30} />
                        <p className="sidebarTopics">Analytics</p>
                      </div>
                    </Link>
                  </ListGroup.Item>
                </div>

                <div>
                  <ListGroup.Item>
                    <div className="Signout" id="signout" onClick={this.handleSignout}>
                      <div className="flexSidebars">
                        <FiLogOut size={30} />
                        <p className="sidebarTopics">Logout</p>
                      </div>
                    </div>
                  </ListGroup.Item>
                </div>

                <button className="tweetBtn" type="button" onClick={this.showPostTweetModal}>
                  Tweet
                </button>
              </ListGroup>
            </nav>
          </div>
          {this.state.showPostTweetModal ? (
            <PostTweetModal
              showPostTweetModal={this.showPostTweetModal}
              showPostTweetModalState={this.state.showPostTweetModal}
            />
          ) : null}
        </div>
      {/* </StickyBox> */}
      </Sticky>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.currentUser._id,
});

export default connect(mapStateToProps)(Sidebar);
