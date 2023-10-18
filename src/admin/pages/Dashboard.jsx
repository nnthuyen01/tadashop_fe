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
    MdOutlineViewList,
    MdRequestPage,
    MdSupervisorAccount,
    MdViewList,
    MdOutlineFormatSize,
    MdSportsSoccer,
} from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '../redux/actions/commonAction';

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        // e.preventDefault();

        if (e) {
            e.preventDefault();
        }
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
                    {!collapsed ? (
                        <img
                            src="assets\images\icons\Logo.png"
                            alt="IMG-LOGO"
                            style={{ width: '195px', marginTop: '10px' }}
                        />
                    ) : (
                        <img
                            src="assets\images\icons\tadashop.png"
                            alt="IMG-LOGO-cl"
                            style={{ marginLeft: '25%', height: '39.98px', marginTop: '10px' }}
                        />
                    )}
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
                            key: '3',
                            icon: <MdSportsSoccer />,
                            label: 'League',
                            children: [
                                {
                                    key: '31',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add League',
                                    onClick: () => navigate('/dashboard/league/add'),
                                },
                                {
                                    key: '32',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Leagues',
                                    onClick: () => navigate('/dashboard/league/list'),
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <MdViewList />,
                            label: 'Others',
                            children: [
                                {
                                    key: '41',
                                    icon: <MdOutlineViewList />,
                                    label: 'List Brands',
                                    onClick: () => navigate('/dashboard/brand'),
                                },
                                {
                                    key: '42',
                                    icon: <MdOutlineViewList />,
                                    label: 'List Vouchers',
                                    onClick: () => navigate('/dashboard/voucher'),
                                },
                                {
                                    key: '43',
                                    icon: <MdOutlineViewList />,
                                    label: 'List Payments',
                                    onClick: () => navigate('/dashboard/payment'),
                                },
                            ],
                        },
                        {
                            key: '5',
                            icon: <MdOutlineInventory2 />,
                            label: 'Products',
                            children: [
                                {
                                    key: 'P5-01',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Upload Images',
                                    onClick: () => navigate('/dashboard/products/upload'),
                                },
                                {
                                    key: 'P5-02',
                                    icon: <MdAddCircleOutline />,
                                    label: 'Add Products',
                                    onClick: () => navigate('/dashboard/products/add'),
                                },
                                {
                                    key: 'P5-03',
                                    icon: <MdFormatListBulleted />,
                                    label: 'List Products',
                                    onClick: () => navigate('/dashboard/products/list'),
                                },
                                {
                                    key: 'P5-04',
                                    icon: <MdOutlineFormatSize />,
                                    label: 'Size Products',
                                    onClick: () => navigate('/dashboard/products/size'),
                                },
                            ],
                        },
                        {
                            key: '6',
                            icon: <MdOutlineShoppingBag />,
                            label: 'Orders',
                        },
                        {
                            key: '7',
                            icon: <MdRequestPage />,
                            label: 'Invoices',
                        },
                        {
                            key: '8',
                            icon: <MdInsertChartOutlined />,
                            label: 'Statistics',
                        },
                        {
                            key: '9',
                            icon: <MdManageAccounts />,
                            label: 'Profiles',
                        },
                        {
                            key: '10',
                            icon: <MdSupervisorAccount />,
                            label: 'Accounts',
                        },
                        {
                            key: '11',
                            icon: <MdLogout />,
                            label: 'Logout',
                            onClick: () => {
                                handleLogout();
                            },
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
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
