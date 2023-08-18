import { Fragment } from 'react';
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
                        <Route path="/forgotPassword" element={<VerifyEmailUser />} />

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
                            {/* <Route path="/dashboard" element={<HomeAdmin />}></Route>
                            <Route path="/dashboard/club/add" element={<AddOrEditClub key="a" />}></Route>
                            <Route path="/dashboard/club/update/:id" element={<AddOrEditClub key="u" />}></Route>
                            <Route path="/dashboard/club/list" element={<ListClubs />}></Route> */}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
