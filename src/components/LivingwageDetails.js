import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const LivingwageDetails = ({ socialGroup }) => {
  const { id, name } = socialGroup;

  return (
    <Col sm={7}>
      <Tab.Content>
        <Tab.Pane eventKey="employable">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Tab.Pane>
        <Tab.Pane eventKey="children">

        </Tab.Pane>
        <Tab.Pane eventKey="pensioner">

        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

export default LivingwageDetails;