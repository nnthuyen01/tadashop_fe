import React from 'react';
import { useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Component, ...rest }) => {
const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate('/', { replace: true });
        return null;
    }

    // return <Route {...rest} element={<Component />} />;
    return <>{children}</>;
};

export default PrivateRoute;
