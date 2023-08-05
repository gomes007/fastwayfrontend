import React, {useEffect, useState} from 'react';
import axiosInstance from '../services/axiosService';
import {useRouter} from 'next/router';

function EmployeesList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const router = useRouter();

    useEffect(() => {
        axiosInstance.get('employees/findEmployees')
            .then(res => {
                setEmployees(res.data.items);
                console.log("Employees retrieved: ", res.data.items);
            })
            .catch(error => {
                console.error("Error retrieving employees: ", error);
            });
    }, []);




    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = id => {
        router.push(`/employee?id=${id}`);
    };

    const handleDelete = (id) =>
     {
        axiosInstance.delete(`employees/${id}`)
        .then(res => {
            console.log("Employee deleted: ", res.data);
            setEmployees(employees.filter(employee => employee.id !== id));
        })
        .catch(error => {
            console.error("Error deleting employee: ", error);
        });
    };

    const filteredEmployees = Array.isArray(employees) ? employees.filter(employee => {
        if (!employee.name) return false;

        const lowerCaseNameIncludesTerm = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
        const hireDate = new Date(employee.hireDate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return lowerCaseNameIncludesTerm &&
            (!start || hireDate >= start) &&
            (!end || hireDate <= end);
    }) : [];




    return (
        <div>
            <input
                className="form-control mb-5"
                type="text"
                placeholder="Search by employee name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
            />
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Phone</th>
                    <th>HireDate</th>
                    <th>Photo</th>
                    <th>File</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((employee, index) => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.privateEmail}</td>
                        <td>{employee.cpf}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.hireDate}</td>
                        <td>
                            {employee.files.filter(file =>
                                file.photoName.toLowerCase().endsWith('.jpg') ||
                                file.photoName.toLowerCase().endsWith('.png') ||
                                file.photoName.toLowerCase().endsWith('.gif')
                            ).map((img, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8080/files/${img.photoName}`}
                                    alt={img.photoName}
                                    style={{width: '80px', height: '80px'}}
                                />
                            ))}
                        </td>
                        <td>
                            {employee.files.filter(file =>
                                !file.photoName.toLowerCase().endsWith('.jpg') &&
                                !file.photoName.toLowerCase().endsWith('.png') &&
                                !file.photoName.toLowerCase().endsWith('.gif')
                            ).map((file, index) => (
                                <React.Fragment key={index}>
                                    <a href={`http://localhost:8080/files/${file.photoName}`}>
                                        {file.photoName}
                                    </a>
                                    {' | '}
                                </React.Fragment>
                            ))}
                        </td>

                        <td>
                            <button onClick={() => handleEdit(employee.id)} className="btn btn-primary">Edit</button>
                            <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        </div>
    );
}

export default EmployeesList;
