import React, {useState} from 'react';
import permissionService from "@/services/permissionService";
import FieldForm from "@/components/Form/FieldForm";
import NavTitle from "@/components/NavTitle/NavTitle";

function Permission() {


    const [permission, setPermission] = useState({
        name: '',
    });

    const handlePermission = (event) => {
        setPermission({
            ...permission,
            [event.target.name]: event.target.value
        });
    }

    const savePermission = () => {
        let data = {
            ...permission
        }

        return permissionService.createPermission(data)
            .then((data) => {
                console.log('Permission registered', data);
                setPermission({
                    name: "",
                });
            }).catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            <NavTitle
                title="Permissions"
                path={[
                    {name: "Home", link: "/"}

                ]}
            />
            <div className="container">
                <div className="card mt-5 p-4">
                    <div className="card-header bg-light">
                        <h3>Permissions Register</h3>
                    </div>
                    <div className="card-body">
                        <div className="col-md-8">
                            <FieldForm
                                label='Name'
                                name='name'
                                type='text'
                                value={permission.name}
                                onChange={handlePermission}
                            />
                        </div>
                            <div className="col-03 d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit" onClick={savePermission}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Permission;
