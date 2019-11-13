import React, { Component } from 'react';
import { Navbar, ListGroup } from 'react-bootstrap';
import './Sidebar.css';
import NavLink from 'react-bootstrap/NavLink';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoHome, GoMail, GoNote, GoGraph } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiBookmark } from 'react-icons/fi';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="fixed">
        <nav className="sidebar flex-column">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Navbar.Brand href="/home">
                <img
                  src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png"
                  width="55px"
                  height="55px"
                  className="d-inline-block align-top"
                  alt="Main logo link to home"
                />
              </Navbar.Brand>
            </ListGroup.Item>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <GoHome size={40} />
                  <p className="sidebarTopics">Home</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <IoMdNotificationsOutline size={40} />
                  <p className="sidebarTopics">Notifications</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <GoMail size={40} />
                  <p className="sidebarTopics">Messages</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <FiBookmark size={40} />
                  <p className="sidebarTopics">Bookmarks</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <GoNote size={40} />
                  <p className="sidebarTopics">Lists</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <FaRegUserCircle size={40} />
                  <p className="sidebarTopics">Profile</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <div className="flexSidebars">
                  <GoGraph size={40} />
                  <p className="sidebarTopics">Analytics</p>
                </div>
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <button className="tweetBtn" type="button">
                Tweet
              </button>
            </NavLink>
          </ListGroup>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
