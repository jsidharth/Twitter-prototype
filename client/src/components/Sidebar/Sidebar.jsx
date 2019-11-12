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
                <br />
                <br />
                <br />
              </Navbar.Brand>
            </ListGroup.Item>
            <NavLink>
              <ListGroup.Item action href="/home">
                <GoHome size={40} />
                Home
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <IoMdNotificationsOutline size={40} />
                Notifications
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <GoMail size={40} />
                Messages
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FiBookmark size={40} />
                Bookmarks
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <GoNote size={40} />
                Lists
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaRegUserCircle size={40} />
                Profile
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <GoGraph size={40} />
                Analytics
                <br />
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <a
                href="https://twitter.com/share?url=http://www.bootstrapbeginners.com/twitter-button/"
                title="Twitter"
                className="btn btn-twitter btn-lg"
              >
                <i className="fa fa-twitter fa-fw" /> Tweet
              </a>
            </NavLink>
          </ListGroup>
        </nav></div>
        
        
    );
  }
}

export default Sidebar;
