import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav, NavItem, Row } from 'react-bootstrap';

import './AppNestedSidebar.scss';

const AppNestedSidebar = ({ navList, navLabel, toggleSidebar }) => {


  return (
    <>
      <span
        className="nested-nav-close"
        onClick={() => toggleSidebar(true)}
      ></span>
      <Row className="nested-nav-wrapper">
        <Col className="nested-nav-title">
          <h3>{navLabel}</h3>
        </Col>
        <Col>
          <Nav className="nested-nav-list">
            {navList.map(({ label, link, childId }) => (
              <NavItem key={childId} className="nested-nav-item">
                <NavLink
                  className="nested-nav-link"
                  activeClassName="active-nav"
                  to={link}
                  onClick={() => toggleSidebar(true)}>
                  {label}
                </NavLink>
              </NavItem>
            ))
            }
          </Nav>
        </Col>
      </Row>
    </>
  )
};

export default AppNestedSidebar;