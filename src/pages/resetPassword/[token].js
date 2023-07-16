import {useState} from 'react';
import {useRouter} from 'next/router';
import axiosInstance from '../../services/axiosService'


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
                token, newPassword: password
            });
            alert('Senha redefinida com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Falha ao redefinir a senha');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <fieldset>
            <div className='card'>
                <div className="row">
                    <h3>Change Password</h3>
                    <div className="card-body">
                        <h8 className="card-title">Password:</h8>
                        <div className='col-md-3'>
                            <input className='form-control'
                                   type="password"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <h8 className="card-title">Confirm new Password:</h8>
                        <div className='col-md-3'>
                            <input className='form-control'
                                   type="password"
                                   value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='col-md-8'>
                        <button className='btn btn-success' type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
    );
}

export default ResetPassword;
