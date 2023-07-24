import React, {useEffect, useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import AddressForm from "@/components/Form/AddressForm";
import EmployeeService from "@/services/employeeService";
import axiosInstance from "@/services/axiosService";
import EmployeePersonalDataForm from "@/components/Form/EmployeePersonalDataForm";

import { useRouter } from 'next/router';

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

    const router = useRouter();
    const { id } = router.query;


    const formatDateArray = dateArray => {
        if (!Array.isArray(dateArray)) {
            return "";
        }
        return `${dateArray[0]}-${dateArray[1].toString().padStart(2, '0')}-${dateArray[2].toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (id) {
            axiosInstance.get(`employees/${id}`)
                .then(res => {
                    const employeeData = res.data;


                    employeeData.birthDate = formatDateArray(employeeData.birthDate);
                    employeeData.hireDate = formatDateArray(employeeData.hireDate);

                    setEmployee(employeeData);

                    if (employeeData.addresses && employeeData.addresses.length > 0) {
                        setAddress(employeeData.addresses);
                    }
                    if (employeeData.positionSalary) {
                        axiosInstance.get(`positions/${employeeData.positionSalary}`)
                            .then(res => {
                                setSelectedPosition(res.data);
                            })
                            .catch(error => console.error('Error getting position details:', error));
                    }
                })
                .catch(error => console.error('Error getting employee:', error));
        }
        axiosInstance.get('positions')
            .then(res => {
                setPositions(res.data);
            })
            .catch(error => console.error(error));
    }, [id]);





    const saveEmployee = () => {
        const employeeData = {...employee};
        delete employeeData.file;
        delete employeeData.selectedFile;
        delete employeeData.position;

        const data = {
            ...employeeData,
            positionSalary: { id: selectedPosition.id },
            addresses: address
        }

        EmployeeService.saveEmployee(data, employee.file)
            .then(response => {
                console.log("Employee saved successfully." + response.data);
            })
            .catch(error => {
                console.error("Error saving employee:", error);
            });
    };


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
                            <EmployeePersonalDataForm
                                employee={employee}
                                handleEmployee={handleEmployee}
                                setEmployee={setEmployee}
                            />
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
