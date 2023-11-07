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
