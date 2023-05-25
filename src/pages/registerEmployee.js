import React, {useState} from 'react';
import withAuth from "@/services/withAuth";
import CampoForm from "@/components/CampoForm";
import {useRouter} from "next/router";
import {Button} from "react-bootstrap";
import AuthService from "@/services/authService";

const EmployeeRegister = () => {

    const router = useRouter();

    const handleLogout = () => {
        AuthService.logout();
        router.push('/login').then(r => r);
    };

    const [state, setState] = useState({
        name: '',
        cpf: '',
        file: null
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        let employeeData = new FormData();
        const employee = {
            name: state.name,
            cpf: state.cpf
        };
        employeeData.append('employee', JSON.stringify(employee));
        employeeData.append('file', state.file);

        AuthService.saveEmployee(employeeData)
            .then((data) => {
                console.log('Employee registered', data);
            })
            .catch((error) => {
                console.error('Error registering employee', error);
            });
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setState({
            ...state,
            file: event.target.files[0]
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <CampoForm
                    label="name"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleChange}
                    error={errors.name}
                />

                <CampoForm
                    label="cpf"
                    name="cpf"
                    type="text"
                    value={state.cpf}
                    onChange={handleChange}
                    error={errors.cpf}
                />

                <div className="form-group">
                    <label htmlFor="file">Upload File</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="file"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <Button onClick={handleLogout}>Deslogar</Button>
            </form>
        </div>
    );
};

export default withAuth(EmployeeRegister);
