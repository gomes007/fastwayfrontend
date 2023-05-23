import React from 'react';
import { useRouter } from 'next/router';
import AuthService from '@/services/authService';

function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const user = AuthService.getCurrentUser();

        React.useEffect(() => {
            if (!user) {
                router.replace('/login').then(r => r);
            }
        }, []);

        return <Component {...props} />
    }
}

export default withAuth;
