import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/ContextProvider';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const { user } = useUser();
    const navigate = useNavigate();
    const { children } = props

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // If the user is logged in, render the children (protected content)
    return <>{user ? children : null}</>;
}
