import React, {useEffect, useState} from 'react';
import AuthService from '../../services/authService';
import axiosInstance from "@/services/axiosService";

function EmployeeImage({ employeeId, employeeName }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchImage();
    }, [employeeId]);

    async function fetchImage() {
        console.log("fetchImage called with:", employeeId);
        try {
            const response = await axiosInstance.get(`/employees/${employeeId}/image`, { responseType: 'arraybuffer' });
            console.log("Response from /employees/{id}/image: ", response);
            const base64 = Buffer.from(response.data).toString('base64');
            //console.log("Base64 Image Data:", base64);
            setImage(`data:image/png;base64,${base64}`);
            //setImage(`data:image/jpeg;base64,${base64}`);
        } catch (err) {
            console.error(err);
        }
    }

    if (!image) {
        return null;
    }

    return <img src={image} alt="Employee01" className="user-ciclo" />;
}



const Navbar = ({ handleMenu }) => {
    const [user, setUser] = useState(null);

    const employeeId = user?.employee;
    const userEmail = user?.email;
    console.log("Employee ID:", employeeId);

    const [employeeName, setEmployeeName] = useState(null); // Mova isso para Navbar


    async function fetchEmployeeDetails(id) { // Mova isso para Navbar
        try {
            const response = await axiosInstance.get(`/employees/${id}`);
            console.log("Employee details:", response.data);
            setEmployeeName(response.data.name);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeDetails(employeeId);
        }
    }, [employeeId]);


    useEffect(() => {
        fetchUser().then(r => console.log(r));
    }, []);

    async function fetchUser() {
        const authUser = AuthService.getCurrentUser();
        if (authUser && authUser.token) {
            try {
                const res = await axiosInstance.get('users/loggedUser');
                console.log("User data:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('User not logged in');
        }
    }





    return (
        <div className="navbar">
            <button className="btn-menu" onClick={() => handleMenu()}>
                <i className="fas fa-bars"></i>
            </button>

            {employeeId ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', color: '#e6d5d5' }}>{employeeName}</span>
                    <EmployeeImage className="user-ciclo" employeeId={employeeId} />
                </div>
            ) : (
                <img src="/images/user.png" className="user-ciclo" alt="user" />
            )}

        </div>
    );
}

export default Navbar;


