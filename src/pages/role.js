import React, {useState, useEffect} from 'react';
import axiosInstance from '../services/axiosService';
import FieldForm from "@/components/Form/FieldForm";
import NavTitle from "@/components/NavTitle/NavTitle";

function Role() {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({name: '', permissions: []});

    useEffect(() => {
        axiosInstance.get('permissions')
            .then(res => {
                setPermissions(res.data);
            })
            .catch(error => console.error('Error getting permissions:', error));

        axiosInstance.get('roles')
            .then(res => {
                setRoles(res.data);
            })
            .catch(error => console.error('Error getting roles:', error));
    }, []);

    const handleRoleNameChange = (e) => {
        setRole({...role, name: e.target.value});
    };

    const handlePermissionSelect = (e, id) => {
        const checked = e.target.checked;
        if (checked) {
            setRole({...role, permissions: [...role.permissions, {id}]});
        } else {
            setRole({...role, permissions: role.permissions.filter(permission => permission.id !== id)});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(role);
        try {
            await axiosInstance.post('roles', role);
            setRole({name: '', permissions: []});
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    return (
        <>
            <NavTitle
                title="Roles"
                path={[
                    {name: "Home", link: "/"}
                ]}
            />

            <div className='container'>
                <div className="card mt-5 p-3">
                    <div className="card-header bg-light">
                        <h3>Roles and Permissions</h3>
                    </div>

                    <div className="card-body">
                        <div className="col-md-8">
                            <FieldForm
                                label='Name'
                                name='name'
                                type='text'
                                value={role.name}
                                onChange={handleRoleNameChange}
                                required/>
                        </div>
                        <div className="col-md-8">
                            <div className='form-control'>
                                <label>PERMISSIONS: </label>
                                {permissions.map(permission => (
                                    <div className='form-check m-2' key={permission.id}>
                                        <input className='m-1' type="checkbox" id={permission.id} name={permission.name}
                                               onChange={(e) => handlePermissionSelect(e, permission.id)}/>
                                        <label htmlFor={permission.id}>{permission.name}</label>
                                    </div>
                                ))}
                            </div>
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

export default Role;
