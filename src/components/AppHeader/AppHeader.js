import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import './AppHeader.css';

const AppHeader = ({ tglSidebar }) => {

  const [hidden, setHidden] = useState(true)

  return (
    <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
      <Nav>
        <Row className="ml-4 mr-4">
          <Nav.Link as={NavLink} to="/" className="p-0">
            {hidden ? <h1 className="logo-title" >Социальные услуги</h1> :
              <FontAwesomeIcon icon={faHeartbeat} style={{ width: "35px", height: "35px", color: "#fff" }} />}
          </Nav.Link>
        </Row>
      </Nav>
      <Nav >
        <Button className="toggle-btn" onClick={() => { tglSidebar(); setHidden(!hidden) }}>
          <span className="toggler-icon"></span>
        </Button>
      </Nav>
    </Navbar>
  )
};

export default AppHeader;