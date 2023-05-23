import React from "react";
import { Button } from 'react-bootstrap';
import AuthService from "@/services/authService";
import { useRouter } from "next/router";
import withAuth from "@/services/withAuth";


const Success = () => {
    const router = useRouter();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login').then(r => r);
    };

    return (
        <div>
            <h1>Login bem-sucedido!</h1>
            <p>Bem-vindo à página de sucesso.</p>
            <Button onClick={handleLogout}>Deslogar</Button>
        </div>
    );
};

export default withAuth(Success);

