import React, {useEffect, useState} from 'react';
import AuthService from '../../services/authService';
import axiosInstance from "@/services/axiosService";

function EmployeeImage({ employeeId, photoName }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchImage();
    }, [employeeId, photoName]);

    async function fetchImage() {
        try {
            const response = await axiosInstance.get(`/employees/${employeeId}/image/${photoName}`, { responseType: 'arraybuffer' });
            const base64 = Buffer.from(response.data, 'binary').toString('base64');
            setImage(`data:image/png;base64,${base64}`);
        } catch (err) {
            console.error(err);
        }
    }

    if (!image) {
        return null;
    }

    return <img src={image} alt="Employee" className="user-ciclo" />;
}

const Navbar = ({ handleMenu }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser().then(r => console.log(r));
    }, []);

    async function fetchUser() {
        const authUser = AuthService.getCurrentUser();
        if (authUser && authUser.token) {
            try {
                const res = await axiosInstance.get('users/loggedUser');
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('User not logged in');
        }
    }

    const employeeId = user && user.employee && user.employee.id;
    const photoName = user && user.employee && user.employee.files && user.employee.files.length > 0 ? user.employee.files[0].photoName : undefined;

    return (
        <div className="navbar">
            <button className="btn-menu" onClick={() => handleMenu()}>
                <i className="fas fa-bars"></i>
            </button>

            {employeeId && photoName ? (
                <EmployeeImage className="user-ciclo" employeeId={employeeId} photoName={photoName} />
            ) : (
                <img src="/images/user.png" className="user-ciclo" alt="user" />
            )}
        </div>
    );
}

export default Navbar;

