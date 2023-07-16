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
                            <a className="link-menu" href="/employeeRegister">
                                <i className="fa-solid fa-user-plus"></i>
                                <span> Register</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/customer">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>customer</span>
                            </a>
                        </li>
                        <li>
                            <a className="link-menu" href="/employee">
                                <i className="fa-solid fa-user-plus"></i>
                                <span>Employee</span>
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
