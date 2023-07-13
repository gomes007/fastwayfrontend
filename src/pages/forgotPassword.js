import React, {useState} from 'react';
import {Button, Form, Alert} from 'react-bootstrap';
import axiosInstance from '@/services/axiosService';
import {router} from "next/client";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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

        <div className='container fp'>
            <Form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Resetar Senha</legend>
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
                </fieldset>
            </Form>
        </div>


    );
};

export default ForgotPassword;
