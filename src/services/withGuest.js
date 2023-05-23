import React from 'react';
import { useRouter } from 'next/router';
import AuthService from '@/services/authService';

function withGuest(Component) {
    return function GuestComponent(props) {
        const router = useRouter();
        const user = AuthService.getCurrentUser();

        React.useEffect(() => {
            if (user) {
                router.replace('/success').then(r => r);
            }
        }, []);

        return <Component {...props} />
    }
}

export default withGuest;
