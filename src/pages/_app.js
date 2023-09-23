import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css'
import '../styles/Menu.style.css'
import '../styles/Employee.style.css'
import '../styles/Navbar.style.css'
import '../styles/Form.style.css'
import '../styles/Password.style.css'
import '../styles/NavTitle.style.css'
import '../styles/product.style.css'
import '../styles/ServiceOrder.style.css'
import '../styles/modal.style.css'

import Menu from "@/components/Menu/Menu";
import {useEffect} from "react";



export default function App({ Component, pageProps }) {

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min');
    }, []);


    return (

        <Menu>
            <Component {...pageProps} />
        </Menu>
    )
}

