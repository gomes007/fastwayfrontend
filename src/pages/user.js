import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosService';
import FieldForm from "@/components/Form/FieldForm";
import NavTitle from "@/components/NavTitle/NavTitle";

function User() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({email: '', password: '', employee: null, role: null});

  useEffect(() => {
    axiosInstance.get('employees/names')
        .then(res => {
          setEmployees(res.data);
        })
        .catch(error => console.error('Error getting employees:', error));

    axiosInstance.get('roles/names')
        .then(res => {
          setRoles(res.data);
        })
        .catch(error => console.error('Error getting roles:', error));
  }, []);

  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployee = employees.find(employee => employee.id === parseInt(e.target.value));
    setUser({email: '', password: '', employee: selectedEmployee, role: null});
  };

  const handleRoleSelect = async (e) => {
    const selectedRoleId = parseInt(e.target.value);
    try {
      const res = await axiosInstance.get(`roles/namesAndPermissions/${selectedRoleId}`);
      const selectedRole = res.data;
      setUser({...user, role: selectedRole});
    } catch (error) {
      console.error('Error getting role details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await axiosInstance.post('users', user);
      setUser({email: '', password: '', employee: null, role: null});
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
      <>
        <NavTitle
            title="Users"
            path={[
              {name: "Home", link: "/"}
            ]}
        />

        <div className='container'>
          <div className="card mt-5 p-3">
            <div className="card-header bg-light">
              <h3>Create User</h3>
            </div>

            <div className="card-body">
              <div className="col-md-8">
                <label>Employee: </label>
                <select name='employee' onChange={handleEmployeeSelect} required>
                  <option value=''>--Select--</option>
                  {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
                {user.employee && (
                    <>
                      <FieldForm
                          label='Email'
                          name='email'
                          type='email'
                          value={user.email}
                          onChange={handleInputChange}
                          required/>
                      <FieldForm
                          label='Password'
                          name='password'
                          type='password'
                          value={user.password}
                          onChange={handleInputChange}
                          required/>
                    </>
                )}
                {user.email && user.password && (
                    <>
                      <label>Role: </label>
                      <select name='role' onChange={handleRoleSelect} required>
                        <option value=''>--Select--</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </>
                )}
                {user.role && (
                    <div>
                      <label>Permissions:</label>
                      <ul>
                        {user.role.permissions.map(permission => (
                            <li key={permission.id}>{permission.name}</li>
                        ))}
                      </ul>
                    </div>
                )}
              </div>
            </div>

            <div className="col-03 d-flex justify-content-end">
              <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
            </div>

          </div>
        </div>
      </>
  );
}

export default User;
