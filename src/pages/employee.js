import React, {useEffect, useState} from 'react';
import EmployeeService from "@/services/employeeService";
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import EmployeePersonalDataForm from "@/components/Form/EmployeePersonalDataForm";
import DependentData from "@/components/Form/DependentData";
import Swal from 'sweetalert2';
import AddressData from "@/components/Form/AddressData";
import PositionSalaryData from "@/components/Form/PositionSalaryData";
import PositionSalaryService from "@/services/positionSalaryService";
import DepartmentService from "@/services/departmentService";
import { useRouter } from 'next/router';
import axiosInstance from "@/services/axiosService";

function Employee() {

    const [employee, setEmployee] = useState({
        hireDate: '',
        department: {id: null},
        positionSalary: {id: null},
        dependents: [],
        name: '',
        birthDate: '',
        gender: '',
        cpf: '',
        privateEmail: '',
        phone: '',
        files: []
    })

    const [address, setAddress] = useState({
        id: null,
        addressType: {id: null},
        city: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        state: '',
        zipCode: ''
    });


    const [newDependent, setNewDependent] = useState({
        name: '',
        birthDate: '',
        gender: '',
        cpf: '',
        relationship: ''
    });

    const [profilePic, setProfilePic] = useState(null);
    const [files, setFiles] = useState([]);

    const [currentProfilePic, setCurrentProfilePic] = useState(null);
    const [currentFiles, setCurrentFiles] = useState([]);



    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);



    useEffect(() => {
        Promise.all([
            PositionSalaryService.getAllPositionSalary(),
            DepartmentService.getAllDepartments()
        ])
            .then(([positionsData, departmentsData]) => {
                setPositions(positionsData);
                setDepartments(departmentsData);
            })
            .catch(error => {
                console.error("Error retrieving data: ", error);
            });
    }, []);

    const router = useRouter();
    const { query } = router;


    const formatDateArray = dateArray => {
        if (!Array.isArray(dateArray)) {
            return "";
        }
        return `${dateArray[0]}-${dateArray[1].toString().padStart(2, '0')}-${dateArray[2].toString().padStart(2, '0')}`;
    };


    useEffect(() => {
        if (query.id) {
            axiosInstance.get(`employees/${query.id}`)
                .then(res => {
                    const employeeData = res.data;


                    employeeData.birthDate = formatDateArray(employeeData.birthDate);
                    employeeData.hireDate = formatDateArray(employeeData.hireDate);


                    setEmployee(employeeData);

                    // Set the profile pic and other files
                    setCurrentProfilePic(employeeData.profilePic);
                    setCurrentFiles(employeeData.files);

                    // Set the address
                    if (employeeData.address) {
                        setAddress(employeeData.address);
                    }

                    const department = departments.find(dept => dept.id === employeeData.department);
                    setSelectedDepartment(department);

                    if (employeeData.positionSalary) {
                        axiosInstance.get(`positions/${employeeData.positionSalary}`)
                            .then(res => {
                                const positionData = res.data;
                                setSelectedPosition(positionData);
                            })
                            .catch(error => console.error('Error getting position details:', error));
                    }
                })
                .catch(error => console.error('Error getting employee:', error));
        }

        axiosInstance.get('positions')
            .then(res => {
                const positionsData = res.data;
                setPositions(positionsData);
            })
            .catch(error => console.error(error));
    }, [query.id, departments]);






    const handleEmployeeChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleDependentChange = (e) => {
        setNewDependent({
            ...newDependent,
            [e.target.name]: e.target.value
        });
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = departments.find(
            (department) => department.id.toString() === e.target.value
        );

        setSelectedDepartment(selectedDepartment);

        setEmployee(prev => ({
            ...prev,
            department: {
                id: selectedDepartment ? selectedDepartment.id : ''
            }
        }));
    };


    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
        console.log("foto",e.target.files[0])
    };

    const handleFilesChange = (input) => {
        if (input instanceof Event) {
            setFiles(Array.from(input.target.files));
        } else if (Array.isArray(input)) {
            setFiles(input);
        }
    };



    const handlePositionChange = (e) => {
        const selectedPosition = positions.find(
            (position) => position.id.toString() === e.target.value
        );

        setSelectedPosition(selectedPosition);

        setEmployee(prev => ({
            ...prev,
            positionSalary: {
                id: selectedPosition ? selectedPosition.id : ''
            }
        }));
    };


    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        // Update the address state
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));

        if (name === 'zipCode' && value.length === 8) {
            fetch(`https://viacep.com.br/ws/${value}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    setAddress((prevAddress) => ({
                        ...prevAddress,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf,
                    }));
                })
                .catch((error) => console.error('Error:', error));
        }
    };


    //logic to add, edit and delete dependents at datatable
    const [editDependentIndex, setEditDependentIndex] = useState(null);

    const editDependent = (index) => {
        setNewDependent(employee.dependents[index]);
        setEditDependentIndex(index);
    }

    const addOrEditDependent = () => {
        if (editDependentIndex !== null) {
            setEmployee(oldEmployee => {
                const newEmployee = {...oldEmployee};
                newEmployee.dependents[editDependentIndex] = newDependent;
                return newEmployee;
            });
            setEditDependentIndex(null);
        } else {
            setEmployee(oldEmployee => {
                const newEmployee = {...oldEmployee};
                newEmployee.dependents = [...newEmployee.dependents, newDependent];
                return newEmployee;
            });
        }
        setNewDependent({
            name: '',
            birthDate: '',
            gender: '',
            cpf: '',
            relationship: ''
        });
    }

    const deleteDependent = (index) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                setEmployee(prev => {
                    const dependentsCopy = [...prev.dependents];
                    dependentsCopy.splice(index, 1);
                    return { ...prev, dependents: dependentsCopy };
                });
                Swal.fire(
                    'Deletado!',
                    'O dependente foi deletado.',
                    'success'
                )
            }
        })
    }
    //end of logic dependents datatable


    const parseDateStringToArray = dateStr => {
        if (typeof dateStr !== 'string') {
            return null;
        }
        const parts = dateStr.split('-');
        if (parts.length !== 3) {
            return null;
        }
        return parts.map(part => parseInt(part, 10));
    };



    const createEmployee = (e) => {
        const employeeData = {...employee, address: address};

        employeeData.birthDate = parseDateStringToArray(employeeData.birthDate);
        employeeData.hireDate = parseDateStringToArray(employeeData.hireDate);
        employeeData.dependents.forEach(dependent => {
            dependent.birthDate = parseDateStringToArray(dependent.birthDate);
        });


        EmployeeService.saveEmployee(employeeData, profilePic, files)
            .then(response => {
                console.log("Employee created: ", response.data);
            })
            .catch(error => {
                console.error("Error creating employee: ", error);
            });
    };

    const updateEmployee = () => {
        const employeeData = {...employee, address: address};

        employeeData.birthDate = parseDateStringToArray(employeeData.birthDate);
        employeeData.hireDate = parseDateStringToArray(employeeData.hireDate);
        employeeData.dependents.forEach(dependent => {
            dependent.birthDate = parseDateStringToArray(dependent.birthDate);
        });

        EmployeeService.updateEmployee(query.id, employeeData, profilePic, files)
            .then(response => {
                console.log("Employee updated: ", response.data);
            })
            .catch(error => {
                console.error("Error updating employee: ", error);
            });
    };


    const saveEmployee = (e) => {
        if (query.id) {
            updateEmployee(e);
            console.log('update', e)
        } else {
            createEmployee(e);
        }
    };

    return (
        <>
            <NavTitle
                title="Add Employee"
                path={[
                    {name: "Home", link: "/"},
                    {name: "List", link: "/employeesList"}
                ]}
            />

            <TabForm
                tabs={[
                    {
                        label: "Personal Data",
                        content: (
                            <EmployeePersonalDataForm
                                employee={employee}
                                currentProfilePic={currentProfilePic}
                                currentFiles={currentFiles}
                                handleEmployeeChange={handleEmployeeChange}
                                handleProfilePicChange={handleProfilePicChange}
                                handleFilesChange={handleFilesChange}
                            />

                        )
                    },
                    {
                        label: "Dependent",
                        content: (
                            <DependentData
                                dependent={newDependent}
                                handleDependentChange={handleDependentChange}
                                handleAddOrEditDependent={addOrEditDependent}
                                handleEditDependent={editDependent}
                                deleteDependent={deleteDependent}
                                dependents={employee.dependents}
                            />
                        )
                    },
                    {
                        label: "Address",
                        content: (
                            <AddressData
                                address={address}
                                handleAddressChange={handleAddressChange}
                            />
                        )
                    },
                    {
                        label: "Position Salary",
                        content: (
                            <PositionSalaryData
                                departments={departments}
                                selectedDepartment={selectedDepartment}
                                handleDepartmentChange={handleDepartmentChange}
                                positions={positions}
                                selectedPosition={selectedPosition}
                                handlePositionChange={handlePositionChange}
                                employee={employee}
                            />

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
