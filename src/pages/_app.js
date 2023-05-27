import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import '../styles/Menu.style.css'
import '../styles/Navbar.style.css'
import Menu from "@/components/Menu/Menu";


import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const showMenu = router.route !== '/login';

    return (
        <>
            {showMenu && <Menu />}
            <Component {...pageProps} />
        </>
    );
}
