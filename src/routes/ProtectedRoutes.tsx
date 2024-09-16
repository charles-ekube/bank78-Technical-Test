import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { children } = props

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    // If the user is logged in, render the children (protected content)
    return <>{currentUser ? children : null}</>;
}
