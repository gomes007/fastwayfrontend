import {useState} from "react";

import ItemMenu from "@/components/Menu/ItemMenu";
import Navbar from "@/components/Navbar/Navbar";
import {useRouter} from "next/router";
import AuthService from "@/services/authService";
import EmployeesList from "@/pages/employeesList";


const Menu = ({children}) => {

    const router = useRouter();

    const [open, setOpen] = useState('aberto');

    const handleMenu = () => {
        (open === 'aberto') ? setOpen('fechado') : setOpen('aberto');
    };


    if (router.route === '/login' || router.route.startsWith('/resetPassword/') || router.route === '/forgotPassword') {
        return (
            <>
                {children}
            </>
        );
    }

    const handleLogout = () => {
        AuthService.logout();
        router.push("/login").then((r) => r);
    };

    return (
        <>
            <Navbar
                tipoMenu={open}
                handleMenu={handleMenu}
            />

            <div className={`menu ${open}`}>
                <h1 className="logo">Logo Here</h1>
                <hr className="divisor"/>

                <ul className="conteudo-menu">
                    <ItemMenu title='Users' icon='fa-solid fa-user'>
                        <li>
                            <a className="link-menu" href="/positionSalary">
                                <i className="fa-solid fa-user-plus"></i>
                                <span> Position and Salary</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/permission">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Permission Register</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/employee">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Employee</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/role">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Role</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/user">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>User</span>
                            </a>
                        </li>

                        <li>
                            <a className="link-menu" href="/employeesList">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>EmployeeList</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/customer">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Customer</span>
                            </a>
                        </li>
                    </ItemMenu>

                    <li>
                        <a className="link-menu" href="/provider">
                            <i className="fa-solid fa-user-plus"></i>
                            <span>Provider</span>
                        </a>
                    </li>

                    <li>
                        <a className="link-menu" href="/providersList">
                            <i className="fa-solid fa-user-plus"></i>
                            <span>ProviderList</span>
                        </a>
                    </li>

                </ul>

                <div>
                    <a className='logout' onClick={handleLogout}>
                        <i className="fa-solid fa-sign-out"></i>
                        <span>Logout</span>
                    </a>
                </div>

            </div>

            <div className={`site ${open}`}>
                <div className="content">
                    {children}
                </div>
            </div>

        </>
    );
};

export default Menu;
