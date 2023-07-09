import {useState} from "react";

import ItemMenu from "@/components/Menu/ItemMenu";
import Navbar from "@/components/Navbar/Navbar";
import {useRouter} from "next/router";


const Menu = ({children}) => {

    const router = useRouter();

    const [open, setOpen] = useState('aberto');

    const handleMenu = () => {
        (open === 'aberto') ? setOpen('fechado') : setOpen('aberto');
    };


    if (router.route === '/login') {
        return (
            <>
                {children}
            </>
        );
    }


    return (
        <>

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
                                <span>New</span>
                            </a>
                        </li>
                    </ItemMenu>
                </ul>
            </div>

            <div className={`site ${open}`}>
                <Navbar
                    tipoMenu={open}
                    handleMenu={handleMenu}
                />
                <div className="content">
                    {children}
                </div>
            </div>


        </>
    );
};

export default Menu;
