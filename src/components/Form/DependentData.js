import React from 'react';
import FieldForm from './FieldForm';
import {Button} from 'react-bootstrap';

const DependentData = ({dependent, handleDependentChange, handleAddOrEditDependent, handleEditDependent, deleteDependent, dependents}) => {


    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <FieldForm
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={dependent.name}
                        onChange={handleDependentChange}
                    />
                </div>
                <div className="col-md-4">
                    <FieldForm
                        label="Birth Date"
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={dependent.birthDate}
                        onChange={handleDependentChange}
                    />
                </div>
                <div className="col-md-4">
                    <FieldForm
                        label="Gender"
                        type="radio"
                        id='gender'
                        name='gender'
                        value={dependent.gender}
                        onChange={handleDependentChange}
                        options={[
                            {value: 'MALE', label: 'Male'},
                            {value: 'FEMALE', label: 'Female'}
                        ]}
                    />
                </div>
                <div className="col-md-4">
                    <FieldForm
                        label="CPF"
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={dependent.cpf}
                        onChange={handleDependentChange}
                    />
                </div>
                <div className="col-md-4">
                    <FieldForm
                        label="Relationship"
                        type="select"
                        id="relationship"
                        name="relationship"
                        value={dependent.relationship}
                        onChange={handleDependentChange}
                        options={[
                            {value: 'SPOUSE', label: 'Spouse'},
                            {value: 'SON', label: 'Son'},
                            {value: 'DAUGHTER', label: 'Daughter'},
                            {value: 'FATHER', label: 'Father'},
                            {value: 'MOTHER', label: 'Mother'}
                        ]}
                    />
                </div>
            </div>
            <Button onClick={handleAddOrEditDependent}>Add Dependent</Button>

            <div>
                <h2>Current Dependents</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>CPF</th>
                        <th>Relationship</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dependents.map((dependent, index) => (
                        <tr key={index}>
                            <td>{dependent.name}</td>
                            <td>{dependent.birthDate}</td>
                            <td>{dependent.gender}</td>
                            <td>{dependent.cpf}</td>
                            <td>{dependent.relationship}</td>
                            <td><Button onClick={() => handleEditDependent(index)}>Edit</Button></td>
                            <td><Button onClick={() => deleteDependent(index)}>Delete</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DependentData;

