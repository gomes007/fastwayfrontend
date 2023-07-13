import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import '../styles/Menu.style.css'
import '../styles/Navbar.style.css'
import '../styles/Form.style.css'
import '../styles/Password.style.css'
import '../styles/NavTitle.style.css'
import Menu from "@/components/Menu/Menu";

export default function App({ Component, pageProps }) {
    return (
        <Menu>
            <Component {...pageProps} />
        </Menu>
    )
}

