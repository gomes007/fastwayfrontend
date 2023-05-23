import React from "react";
import { Button } from 'react-bootstrap';
import AuthService from "@/services/authService";
import { useRouter } from "next/router";

const Success = () => {
    const router = useRouter();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/').then(r => console.log(r));
    };

    return (
        <div>
            <h1>Login bem-sucedido!</h1>
            <p>Bem-vindo à página de sucesso.</p>
            <Button onClick={handleLogout}>Deslogar</Button>
        </div>
    );
};

export default Success;
