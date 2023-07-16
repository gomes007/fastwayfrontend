import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import withAuth from "@/services/withAuth";

const Unauthorized = () => (
    <Container className="mt-5">
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Alert variant='danger'>
                    Você não está autorizado a acessar esta página.
                </Alert>
            </Col>
        </Row>
    </Container>
);

export default withAuth(Unauthorized);
