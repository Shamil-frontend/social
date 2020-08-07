import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const SocialGroupDetails = (groups) => {

  return (
    <Nav variant="pills" className="flex-column">
      {
        groups.map((groupItem) => {
          const { id, name, eventKey } = groupItem;

          return (
            <Nav.Item key={id}>
              <Nav.Link eventKey={eventKey}>{name}</Nav.Link>
            </Nav.Item>
          )
        })
      }
    </Nav> +
  )
}

export default SocialGroupDetails;