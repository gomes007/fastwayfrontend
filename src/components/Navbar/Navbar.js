import React, { useEffect, useState } from 'react';
import AuthService from '../../services/authService';
import axiosInstance from "@/services/axiosService";

function EmployeeImage({ employeeId }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await axiosInstance.get(`/employees/${employeeId}/image`, { responseType: 'arraybuffer' });
                const base64 = Buffer.from(response.data).toString('base64');
                setImage(`data:image/png;base64,${base64}`);
            } catch (err) {
                console.error(err);
            }
        }

        if (employeeId) {
            fetchImage();
        }
    }, [employeeId]);

    if (!image) return null;
    return <img src={image} alt="Employee01" className="user-ciclo" />;
}

const Navbar = ({ handleMenu }) => {
    const [user, setUser] = useState(null);
    const [employeeName, setEmployeeName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // New state

    const { employee: employeeId, email: userEmail } = user || {};

    useEffect(() => {
        async function fetchUserDetails() {
            if (employeeId) {
                try {
                    const response = await axiosInstance.get(`/employees/${employeeId}`);
                    setEmployeeName(response.data.name);
                } catch (err) {
                    console.error(err);
                }
            }
        }

        fetchUserDetails();
    }, [employeeId]);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);  // Set to loading state
            const authUser = AuthService.getCurrentUser();
            if (authUser && authUser.token) {
                try {
                    const res = await axiosInstance.get('users/loggedUser');
                    setUser(res.data);
                    setIsLoading(false);  // Set to non-loading state after fetching user data
                } catch (err) {
                    console.error(err);
                    setIsLoading(false);  // Set to non-loading state in case of error
                }
            } else {
                setIsLoading(false);  // Set to non-loading state if no auth user
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="navbar">
            <button className="btn-menu" onClick={handleMenu}>
                <i className="fas fa-bars"></i>
            </button>

            {isLoading ? null : (
                employeeId ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px', color: '#e6d5d5' }}>{employeeName}</span>
                        <EmployeeImage employeeId={employeeId} />
                    </div>
                ) : (
                    <img src="/images/user.png" className="user-ciclo" alt="user" />
                )
            )}
        </div>
    );
}

export default Navbar;
