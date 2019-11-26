import React, { Component } from 'react';
import { Navbar, ListGroup } from 'react-bootstrap';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoHome, GoMail, GoNote, GoGraph } from 'react-icons/go';
import { FiBookmark } from 'react-icons/fi';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <nav className="sidebar">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Navbar.Brand href="/home">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png"
                    width="45px"
                    height="35px"
                    className="d-inline-block align-top"
                    alt="Main logo link to home"
                  />
                  <br />
                  <br />
                </Navbar.Brand>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/home">
                  <div className="flexSidebars">
                    <GoHome size={30} />
                    <p className="sidebarTopics">Home</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/messages">
                  <div className="flexSidebars">
                    <GoMail size={30} />
                    <p className="sidebarTopics">Messages</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/bookmarks">
                  <div className="flexSidebars">
                    <FiBookmark size={30} />
                    <p className="sidebarTopics">Bookmarks</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/lists">
                  <div className="flexSidebars">
                    <GoNote size={30} />
                    <p className="sidebarTopics">Lists</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/profile">
                  <div className="flexSidebars">
                    <FaRegUserCircle size={30} />
                    <p className="sidebarTopics">Profile</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to="/analytics">
                  <div className="flexSidebars">
                    <GoGraph size={30} />
                    <p className="sidebarTopics">Analytics</p>
                  </div>
                </Link>
              </ListGroup.Item>

              <button className="tweetBtn" type="button">
                Tweet
              </button>
            </ListGroup>
          </nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
