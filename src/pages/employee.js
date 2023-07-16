import React, {useState} from 'react';
import NavTitle from "@/components/NavTitle/NavTitle";
import TabForm from "@/components/Form/TabForm";
import AddressForm from "@/components/Form/AddressForm";
import FieldForm from "@/components/Form/FieldForm";
import EmployeeService from "@/services/employeeService";


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


    const handleEmployee = (e) => {
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

    const [position, setPosition] = useState({
        position: '',
        salary: '',
        commission: '',
        role: '',
    });

    const handlePosition = (e) => {
        setPosition({
            ...position,
            [e.target.name]: e.target.value
        });
    }

    /*

    const saveEmployee = () => {
        const employeeData = {...employee};
        delete employeeData.file;
        delete employeeData.selectedFile;

        const data = {
            ...employeeData,
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

     */

    const saveEmployee = () => {
        const employeeData = {...employee};
        delete employeeData.file;
        delete employeeData.selectedFile;

        const data = {
            ...employeeData,
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
                                                onRemove={() => setEmployee({ ...employee, file: null, selectedFile: null })}  // Clear both file and selectedFile
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
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name"/>
                            </div>
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
