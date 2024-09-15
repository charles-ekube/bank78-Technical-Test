import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Dashboard from '../pages/dashboard/Index';
import DocumentUpload from '../pages/dashboard/DocumentUpload';

const RoutesContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                        <></>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <></>
                        <DocumentUpload />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default RoutesContainer



