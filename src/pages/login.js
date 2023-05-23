import React, { useState } from "react";
import { useRouter } from "next/router";

import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { FaUserCircle } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from "@/services/authService";
import withGuest from "@/services/withGuest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      console.log(response);

      if (response.token) {
        await router.push('/success');
      } else {
        setErrorMessage("Erro ao efetuar login. Por favor, tente novamente.");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Erro ao efetuar login. Por favor, tente novamente.");
    }
  };

  return (
      <Container fluid className="h-100 bg-white">
        <Row className="justify-content-center align-items-center h-100">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="shadow-lg border-0 rounded-lg mt-5">
              <Card.Header className="text-center">
                <h3 className="font-weight-light my-4">
                  <FaUserCircle size="2em" className="mb-2" />
                  Login
                </h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Insira o email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>

                  {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Entrar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default withGuest(Login);
