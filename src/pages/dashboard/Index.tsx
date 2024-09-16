
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    console.log(currentUser, 'user')
    const navigate = useNavigate();
    // console.log(user, 'me')

    const handleLogout = () => {
        // logout();
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome, </h1>
            <button onClick={() => navigate('/upload')}>Upload Documents</button>

            {/* Display uploaded document in Dashboard */}
            {document && (
                <div>
                    <h2>Uploaded Document:</h2>
                    {/* <p>{document.name}</p> */}
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard

