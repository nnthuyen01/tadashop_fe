import { Fragment, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/user/layouts';
import { Provider } from 'react-redux';
import Login from './user/pages/Auth/Login/Login';
import Dashboard from './admin/pages/Dashboard';
import PrivateRoute from './admin/auth/PrivateRoute';
import store from './admin/redux/store';

import axios from 'axios';
import VerifyEmailUser from './user/pages/Auth/Login/VerifyEmailUser';
import ForgotPassword from './user/pages/Auth/ForgotPassword';
import VerifyForgotPassword from './user/pages/Auth/VerifyForgotPassword';
import TokenExpirationChecker from './common/TokenExpirationChecker';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

function App() {
    // useEffect(() => {
    //     // Kiểm tra xem access_token có trong localStorage hay không
    //     const token = localStorage.getItem('auth_token');

    //     if (token) {
    //         // Decode token để truy cập thông tin thời gian hết hạn
    //         const decodedToken = jwtDecode(token);
    //         const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

    //         // Kiểm tra xem thời gian hiện tại có lớn hơn thời gian hết hạn không
    //         if (Date.now() >= expirationTime) {
    //             // Token đã hết hạn, xóa nó và quay lại trang chủ
    //             localStorage.removeItem('auth_token');
    //             localStorage.removeItem('auth_name');
    //             window.location.href = '/';
    //         }
    //     }
    // }, []);

    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <TokenExpirationChecker />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route path="/login" element={<Login />} />
                        <Route path="/VerifyRegister" element={<VerifyEmailUser />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                        <Route path="/verifyForgotPassword" element={<VerifyForgotPassword />} />

                        {/* PrivateRoute */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        >
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
