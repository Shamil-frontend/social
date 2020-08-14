import React from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const IndexPage = () => {

    return (
        <>
            <Row sm={12} className='row justify-content-center'>
                <Alert variant="light">
                    <Alert.Heading>Вы на главной странице справочника  Соц-услуг.</Alert.Heading>
                    <p className="mb-0">
                        Если у вас возникнут вопросы, свяжитесь с технической поддержкой.
                </p>
                </Alert>
            </Row>
            <Row sm={12} className='row justify-content-center'>
                <Col sm={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Список групп</Card.Title>
                            <Card.Text>

                            </Card.Text>
                            <Link className="btn btn-primary btn-block" to="/socialPage">Перейти</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default IndexPage;