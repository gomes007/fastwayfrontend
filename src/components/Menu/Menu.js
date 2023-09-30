import {useState} from "react";

import ItemMenu from "@/components/Menu/ItemMenu";
import Navbar from "@/components/Navbar/Navbar";
import {useRouter} from "next/router";
import AuthService from "@/services/authService";


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
            <Navbar handleMenu={handleMenu}/>

            <div className={`menu ${open}`}>
                <h1 className="logo logo-img">
                    <img src="/img/logo.png"/>
                </h1>


                <ul className="conteudo-menu">
                    <div className='register'>
                        <li>
                            <a className="link-menu emp" href="/employee">
                                <i className="fa-solid fa-user-tie"></i>
                                <span>Employee</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/positionSalary">
                                <i className="fa-solid fa-money-check-alt"></i>
                                <span>Position and Salary</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/customer">
                                <i className="fa-solid fa-user-tag"></i>
                                <span>Customer</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/provider">
                                <i className="fa-solid fa-handshake"></i>
                                <span>Provider</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/product">
                                <i className="fa-solid fa-box"></i>
                                <span>Product</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/costCenter">
                                <i className="fa-solid fa-dollar-sign"></i>
                                <span>Cost Center</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/service">
                                <i className="fa-solid fa-wrench"></i>
                                <span>Service</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/serviceOrder">
                                <i className="fa-solid fa-clipboard-list"></i>
                                <span>Service Order</span>
                            </a>
                        </li>
                    </div>

                    <div className='list'>
                        <li>
                            <a className="link-menu emp" href="/employeesList">
                                <i className="fa-solid fa-users"></i>
                                <span>Employee List</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/providersList">
                                <i className="fa-solid fa-list-alt"></i>
                                <span>Provider List</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/productList">
                                <i className="fa-solid fa-th-list"></i>
                                <span>Product List</span>
                            </a>
                        </li>
                    </div>

                    <ItemMenu title='Users Setting' icon='fa-solid fa-cog'>
                        <li>
                            <a className="link-menu" href="/user">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>User</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/permission">
                                <i className="fa-solid fa-shield"></i>
                                <span>Permission</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/role">
                                <i className="fa-solid fa-users-cog"></i>
                                <span>Role and Permission</span>
                            </a>
                        </li>
                    </ItemMenu>


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
