import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PlayerRoute = ({ children }) => {
    const { token } = useSelector((store) => store.auth);
    const { user } = useSelector((store) => store.profile);

    // Check if token is valid and account type is 'Player'
    if (token !== 'null' && user?.accountType === 'Player') {
        return children;
    }

    // Redirect to home page if conditions are not met
    return <Navigate to="/" replace />;
};

export default PlayerRoute;
