import React, {useEffect, useState} from 'react';
import axiosInstance from '../services/axiosService';
import {useRouter} from 'next/router';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const router = useRouter();

    useEffect(() => {
        axiosInstance.get('employees')
            .then(res => {
                setEmployees(res.data);
            })
            .catch(error => console.error('Error getting employees:', error));
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = id => {
        router.push(`/employee/?id=${id}`);
    };


    const handleDelete = (id) => {

    };

    const filteredEmployees = employees.filter(employee => {
        const lowerCaseNameIncludesTerm = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
        const hireDate = new Date(employee.hireDate);

        const startDateIsSet = startDate !== "";
        const endDateIsSet = endDate !== "";

        if (startDateIsSet && endDateIsSet) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const hireDateInRange = start <= hireDate && hireDate <= end;
            return lowerCaseNameIncludesTerm && hireDateInRange;
        } else if (startDateIsSet) {
            const start = new Date(startDate);
            return lowerCaseNameIncludesTerm && start <= hireDate;
        } else if (endDateIsSet) {
            const end = new Date(endDate);
            return lowerCaseNameIncludesTerm && hireDate <= end;
        } else {
            return lowerCaseNameIncludesTerm;
        }
    });

    return (
        <div className='content'>
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
            <table className="table table-dark table-striped table-hover mt-5 caption-top">
                <caption>List of Employees</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Phone</th>
                    <th>Hire Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.privateEmail}</td>
                        <td>{employee.cpf}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.hireDate}</td>
                        <td>
                            <button onClick={() => handleEdit(employee.id)}>Edit</button>
                            <button onClick={() => handleDelete(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
