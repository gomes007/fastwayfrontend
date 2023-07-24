import React from 'react';
import FieldForm from './FieldForm';

const EmployeePersonalDataForm = ({ employee, handleEmployee, setEmployee }) => {

    return (
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
    );
};

export default EmployeePersonalDataForm;
