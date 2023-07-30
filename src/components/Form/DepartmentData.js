import React from 'react';

const DepartmentData = ({ departments, selectedDepartment, handleDepartmentChange }) => {

    return (
        <div className="row">
            <div className="col-md-4">
                <label>Department</label>
                <select
                    name="department"
                    className='form-select'
                    value={selectedDepartment ? selectedDepartment.id.toString() : ''}
                    onChange={handleDepartmentChange}
                >
                    <option value="">Select department</option>
                    {Array.isArray(departments) && departments.map((department) => (
                        <option
                            key={department.id}
                            value={department.id}
                        >
                            {department.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DepartmentData;
