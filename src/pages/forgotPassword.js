import React, {useState} from 'react';
import {Button, Form, Alert, Card} from 'react-bootstrap';
import axiosInstance from '@/services/axiosService';
import {useRouter} from "next/router";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post('password-reset/forgot', {email});
            setMessage('Se um usuário existir com este email, um email de redefinição de senha será enviado.');
            setError('');
        } catch (error) {
            setError('Erro ao solicitar a redefinição de senha. Por favor, tente novamente.');
            setMessage('');
        }
    };

    const handleBackToLogin = () => {
        router.push('/login').then(r => r);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Card className='fp'>
                <Card.Body>
                    <Card.Title>Esqueceu sua senha?</Card.Title>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira o email" value={email}
                                      onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>

                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}

                    <Button variant="primary" type="submit" className='button1'>
                        Solicitar redefinição de senha
                    </Button>
                    <Button variant="primary" type="button" onClick={handleBackToLogin}
                            className='button1'>Voltar</Button>
                </Card.Body>
            </Card>
        </Form>
    );
};

export default ForgotPassword;
