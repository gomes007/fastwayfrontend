import {useState} from 'react';
import {useRouter} from 'next/router';
import axiosInstance from '../../services/axiosService'
import React from "@types/react";

function ResetPassword() {
    const router = useRouter();
    const {token} = router.query;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não conferem");
            return;
        }

        try {
            await axiosInstance.post('password-reset/reset', {
                token,
                newPassword: password
            });
            alert('Senha redefinida com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Falha ao redefinir a senha');
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <label>
                    Nova senha:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Confirmar nova senha:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Redefinir senha</button>
            </form>
    );
}

export default ResetPassword;
