import { Link, useNavigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Row, Col, Avatar, message } from 'antd';
import './Dashboard.css';
import {
    MdAddCircleOutline,
    MdCategory,
    MdFormatListBulleted,
    MdInsertChartOutlined,
    MdLogout,
    MdManageAccounts,
    MdOutlineHome,
    MdOutlineInventory2,
    MdOutlineShoppingBag,
    MdRequestPage,
    MdSupervisorAccount,
} from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '../redux/actions/commonAction';

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        navigate('/');
    };

    const [collapsed, setCollapsed] = useState(false);
    const [marginLeft, setMarginLeft] = useState(200);

    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (msg) {
            dispatch(setMessage(''));
            message.success(msg);
        }
        if (err) {
            dispatch(setError(''));
            message.error(err);
        }
    }, [msg, err]);

    const siteLayoutStyle = { marginLeft: marginLeft };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, right: 0, bottom: 0 }}
            >
                <div className="logoAdmin">
                    <h2>{collapsed ? 'SS' : 'SpringShop'}</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <MdOutlineHome />,
                            label: 'Home',
                            onClick: () => navigate('/dashboard'),
                        },
                        {
                            key: '2',
                            icon: <MdCategory />,
                            label: 'Club',
                            children: [
                                {
                                    key: '21',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Club',
                                    onClick: () => navigate('/dashboard/club/add'),
                                },
                                {
                                    key: '22',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Club',
                                    onClick: () => navigate('/dashboard/club/list'),
                                },
                            ],
                        },
                        {
                            key: '210',
                            icon: <MdCategory />,
                            label: 'Others',
                            children: [
                                {
                                    key: '211',
                                    icon: <MdAddCircleOutline />,
                                    label: 'List Manufacturers',
                                    onClick: () => navigate('/dashboard/test'),
                                },
                                {
                                    key: '221',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Countries',
                                    onClick: () => navigate('/countries/list'),
                                },
                                {
                                    key: '223',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Provinces',
                                    onClick: () => navigate('/provinces/list'),
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <MdOutlineInventory2 />,
                            label: 'Products',
                            children: [
                                {
                                    key: 'P3-01',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Upload Images',
                                    onClick: () => navigate('/products/upload'),
                                },
                                {
                                    key: 'P3-02',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Products',
                                    onClick: () => navigate('/products/add'),
                                },
                                {
                                    key: 'P3-03',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Products',
                                    onClick: () => navigate('/products/list'),
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <MdOutlineShoppingBag />,
                            label: 'Orders',
                        },
                        {
                            key: '5',
                            icon: <MdRequestPage />,
                            label: 'Invoices',
                        },
                        {
                            key: '6',
                            icon: <MdInsertChartOutlined />,
                            label: 'Statistics',
                        },
                        {
                            key: '7',
                            icon: <MdManageAccounts />,
                            label: 'Profiles',
                        },
                        {
                            key: '8',
                            icon: <MdSupervisorAccount />,
                            label: 'Accounts',
                        },
                        {
                            key: '9',
                            icon: <MdLogout />,
                            label: 'Logout',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={siteLayoutStyle}>
                <Header
                    className="site-layout-background"
                    style={{ padding: 0, right: 16, left: marginLeft + 16, top: 0, position: 'fixed', height: 70 }}
                >
                    <Row>
                        <Col md={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => {
                                    const sts = !collapsed;
                                    setCollapsed(sts);
                                    setMarginLeft(sts ? 80 : 200);
                                }}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col md={4}>
                            <div>
                                <Avatar size="default" icon={<UserOutlined />}></Avatar> Nguyen Ngoc Thuyen
                            </div>
                        </Col>
                        <Col md={2}>
                            <Link to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '80px 16px 24px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <div className="content-panel">
                        {/* <Routes>
              <Route path="/dashboard/home" element={<Home1 />}></Route>
              <Route path="/dashboard/club/add" element={<AddOrEditClub key="a" />}></Route>
              <Route path="/dashboard/club/update/:id" element={<AddOrEditClub key="u" />}></Route>
              <Route path="/dashboard/club/list" element={<ListClubs />}></Route>
            </Routes> */}

                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
