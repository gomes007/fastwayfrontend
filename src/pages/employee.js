import React, {useEffect, useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import AddressForm from "@/components/Form/AddressForm";
import FieldForm from "@/components/Form/FieldForm";
import EmployeeService from "@/services/employeeService";
import positionSalaryService from "@/services/positionSalaryService";
import axios from "axios";
import axiosInstance from "@/services/axiosService";


function Employee() {

    const [employee, setEmployee] = useState({
        name: '',
        privateEmail: '',
        cpf: '',
        phone: '',
        file: null,
        selectedFile: null,
        birthDate: '',
        hireDate: '',
        gender: '',
        otherInformations: ''
    });

    const [selectedPosition, setSelectedPosition] = useState(null);


    const handleEmployee = (e) => {

        if (e.target.name === 'position') {
            const selected = positions.find(pos => pos.position === e.target.value);
            setSelectedPosition(selected);
        }

        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file) {
                setEmployee(prevState => ({
                    ...prevState,
                    [e.target.name]: file,
                    selectedFile: URL.createObjectURL(file),
                }));
            }
        } else {
            setEmployee(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };


    const [address, setAddress] = useState([]);

    const [positions, setPositions] = useState({
        id: '',
        position: '',
        salary: '',
        commission: '',
        role: ''
    });


    useEffect(() => {
        axiosInstance.get('positions')
            .then(res => {
                console.log('Data received:', res.data);
                setPositions(res.data);
                console.log('Positions state after update:', positions);
            })
            .catch(error => console.error(error));
    }, []);



    const saveEmployee = () => {
        const employeeData = {...employee};
        delete employeeData.file;
        delete employeeData.selectedFile;
        delete employeeData.position;

        const data = {
            ...employeeData,
            positionSalary: selectedPosition,
            addresses: address
        }

        EmployeeService.saveEmployee(data, employee.file)
            .then(response => {
                console.log("Employee saved successfully.");
            })
            .catch(error => {
                console.error("Error saving employee:", error);
            });
    };


    //console.log("Rendering component", positions);

    return (
        <>
            <NavTitle
                title="Add Employee"
                path={[
                    {name: "Home", link: "/"},
                    {name: "Registry", link: "/registry"},
                    {name: "Customer", link: "/registry/customer"}
                ]}
            />

            <TabForm
                tabs={[
                    {
                        label: 'Personal Data',
                        content: (
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>
                                            <i className="fa fa-address-card" aria-hidden="true"></i>
                                            Employee Data
                                        </h3>
                                    </div>
                                </div>
                                <div className='content'>
                                    <div className="line_01">
                                        <div className="col_01">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <FieldForm
                                                        label="Name"
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={employee.name}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <FieldForm
                                                        label="Private Email"
                                                        type="email"
                                                        id="privateEmail"
                                                        name="privateEmail"
                                                        value={employee.privateEmail}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <FieldForm
                                                        label="CPF"
                                                        type="text"
                                                        id="cpf"
                                                        name="cpf"
                                                        value={employee.cpf}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <FieldForm
                                                        label="Phone"
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        value={employee.phone}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <FieldForm
                                                        label="Birth Date"
                                                        type="date"
                                                        id="birthDate"
                                                        name="birthDate"
                                                        value={employee.birthDate}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <FieldForm
                                                        label='Gender'
                                                        type="radio"
                                                        id='gender'
                                                        name='gender'
                                                        value={employee.gender}
                                                        onChange={handleEmployee}
                                                        options={[
                                                            {value: 'MALE', label: 'Male'},
                                                            {value: 'FEMALE', label: 'Female'}
                                                        ]}
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <FieldForm
                                                        label="Hire Date"
                                                        type="date"
                                                        id="hireDate"
                                                        name="hireDate"
                                                        value={employee.hireDate}
                                                        onChange={handleEmployee}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col_2">
                                        <div>
                                            <FieldForm
                                                label="Profile Picture"
                                                type="file"
                                                id="file"
                                                name="file"
                                                value={employee.selectedFile}
                                                onChange={handleEmployee}
                                                onRemove={() => setEmployee({
                                                    ...employee,
                                                    file: null,
                                                    selectedFile: null
                                                })}
                                            />
                                        </div>
                                    </div>


                                </div>
                                <div className="line_03">
                                    <FieldForm
                                        label='Others Informations'
                                        type="textarea"
                                        rows={4}
                                        id="otherInformations"
                                        name="otherInformations"
                                        value={employee.otherInformations}
                                        onChange={handleEmployee}
                                    />
                                </div>

                            </>
                        )
                    },
                    {
                        label: 'Address',
                        content: (
                            <>
                                <AddressForm
                                    addressesList={address}
                                    setAddressesList={setAddress}
                                />
                            </>
                        )
                    },
                    {
                        label: 'Position and Salary',
                        content: (
                            <>
                                <div className="col-md-6">
                                    <h3>
                                        <i className="fas fa-dollar-sign"></i>
                                        Position and Salary
                                    </h3>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Position</label>
                                        <select name="position" className='form-select'
                                                value={selectedPosition ? selectedPosition.position : ''}
                                                onChange={handleEmployee}>
                                            <option value="">Select position</option>
                                            {Array.isArray(positions) && positions.map((position, index) => (
                                                <option key={index}
                                                        value={position.position}>{position.position}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2 mt-2">
                                        <label>Salary </label>
                                        <input type="text" name="salary" className='form-control bg-secondary'
                                               value={selectedPosition ? selectedPosition.salary : ''} readOnly/>
                                    </div>
                                    <div className="col-md-2 mt-2">
                                        <label>Commission</label>
                                        <input type="text" name="commission" className='form-control bg-secondary'
                                               value={selectedPosition ? selectedPosition.commission : ''} readOnly/>
                                    </div>
                                </div>

                            </>
                        )
                    }
                ]}
            />

            <div className="row">
                <div className="col-md-12">
                    <div className="float-right">
                        <button onClick={saveEmployee} type="button" className="btn btn-success">
                            <i className="fa fa-save mr-12px"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Employee;
