import React, { Component } from 'react';
import { Navbar, ListGroup } from 'react-bootstrap';
import './Sidebar.css';
import NavLink from 'react-bootstrap/NavLink';
import { FaBell, FaListAlt, FaUserAlt, FaFirstdraft, FaHome, FaEnvelope } from 'react-icons/fa';

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
                <FaHome size={50} />
                Home
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaBell size={40} />
                Notifications
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaEnvelope size={40} />
                Messages
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaListAlt size={40} />
                Lists
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaUserAlt size={40} />
                Profile
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
            <NavLink>
              <ListGroup.Item action href="/home">
                <FaFirstdraft size={40} />
                Analytics
                <br />
                <br />
                <br />
              </ListGroup.Item>
            </NavLink>
          </ListGroup>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
