// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // const PrivateRoute = ({ element: Component, ...rest }) => {
// const PrivateRoute = ({ children }) => {
//     const isAuthenticated = !!localStorage.getItem('auth_token');
//     const navigate = useNavigate();
//     if (!isAuthenticated) {
//         navigate('/', { replace: true });
//         return null;
//     }

//     // return <Route {...rest} element={<Component />} />;
//     return <>{children}</>;
// };

// export default PrivateRoute;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            // Nếu không có token, chuyển hướng về trang đăng nhập
            navigate('/', { replace: true });
            return;
        }

        try {
            // Giải mã token để lấy thông tin người dùng, bao gồm quyền
            const role = localStorage.getItem('role');

            // Kiểm tra quyền của người dùng (ví dụ: role là 'admin')
            if (role && role !== 'ADMIN') {
                // Nếu không có quyền, chuyển hướng về trang chủ
                navigate('/', { replace: true });
            }
        } catch (error) {
            // Xử lý lỗi giải mã token (nếu có)
            console.error('Error role:', error);
            navigate('/', { replace: true });
        }
    }, [token, navigate]);
    // Nếu mọi thứ hợp lệ, render children (các thành phần con)
    return <>{children}</>;
};

export default PrivateRoute;
