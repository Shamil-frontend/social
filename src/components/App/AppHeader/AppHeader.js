import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './AppHeader.css';

const AppHeader = () => {

  return (
    <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
      <Nav>
        <Nav.Link as={NavLink} to="/" className="logo-link" >
          <h1 className="logo-title" >Социальные услуги</h1>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
};

export default AppHeader;