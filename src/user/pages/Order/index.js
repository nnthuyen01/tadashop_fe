import React, { useEffect, useLayoutEffect, useState } from 'react';
import HeaderPages from '~/user/components/HeaderPages';

import axios from 'axios';
import { API_URL } from '~/config/constant';
import { Link, useNavigate } from 'react-router-dom';

import { Table, Tag } from 'antd';

import Column from 'antd/lib/table/Column';
import { format } from 'date-fns';

function Order() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bool, setBool] = useState(true);
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const isAuthenticated = () => {
            const token = localStorage.getItem('auth_token');
            return !!token;
        };
        console.log(isAuthenticated());
        // Redirect to login if not authenticated
        if (!isAuthenticated()) {
            navigate('/login', { replace: true });
        } else {
            axios
                .get(API_URL + 'orderUser/orders')
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setOrders(response.data);

                        setLoading(false);
                    }
                })
                .catch((error) => {
                    if (error.response.data.message === 'Order Not Found') {
                        setLoading(false);
                        setBool(false);
                    }
                    console.error('Lỗi khi fetch dữ liệu từ API:', error);
                });
        }
    }, []);
    function formatNumberWithCommas(number) {
        if (number !== undefined && number !== null) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            // Handle the case when number is undefined or null
            return '';
        }
    }
    const handleRowClick = (record) => {
        // Implement the logic you want to execute on row click
        console.log('Clicked on row:', record);

        navigate(`/order-detail/${record.id}`);
    };

    const rowProps = (record, index) => {
        return {
            onClick: () => handleRowClick(record),
        };
    };
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />
            {/* <!-- breadcrumb --> */}
            <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                    <Link to="/" className="stext-107 cl8 hov-cl1 trans-04">
                        Trang chủ
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>
                    <span className="stext-107 cl4">Đơn hàng</span>
                </div>
            </div>
            <div className="container" style={{ paddingBottom: '20px', backgroundColor: '#fff' }}>
                <div
                    style={{
                        backgroundColor: '#f1eded',
                        borderRadius: '20px',
                        border: '2px solid #c70101',
                    }}
                >
                    <div
                        className="ltext-105"
                        style={{
                            paddingTop: '30px',
                            paddingBottom: '10px',
                            textAlign: 'center',
                            color: 'white',
                            backgroundColor: '#2a2a2a',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }}
                    >
                        Đơn hàng của bạn
                    </div>
                    <div
                        style={{
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            minHeight: '60vh',
                            borderTop: '2px solid #c70101',
                        }}
                    >
                        {loading ? (
                            <div style={{ textAlign: 'center' }}>Đang tải dữ liệu...</div>
                        ) : (
                            <>
                                {!bool && orders.length === 0 ? (
                                    <div style={{ textAlign: 'center' }}>Bạn không có đơn hàng nào.</div>
                                ) : (
                                    <Table
                                        dataSource={orders}
                                        size="small"
                                        rowKey="id"
                                        pagination={false}
                                        style={{ margin: 'auto', maxWidth: '96%' }}
                                        onRow={rowProps}
                                    >
                                        <Column title="ID" key="id" dataIndex="id" width={40} align="center"></Column>

                                        <Column
                                            title="Username"
                                            key="username"
                                            render={(_, record) => <span>{record.orderUser?.username}</span>}
                                        ></Column>
                                        <Column title="Người nhận" key="receiverName" dataIndex="receiverName"></Column>
                                        <Column
                                            title="Số điện thoại"
                                            key="receiverPhone"
                                            dataIndex="receiverPhone"
                                        ></Column>
                                        <Column
                                            title="Địa chỉ"
                                            key="deliveryAddress"
                                            dataIndex="deliveryAddress"
                                        ></Column>

                                        <Column
                                            title="Thời gian tạo"
                                            key="createTime"
                                            dataIndex="createTime"
                                            render={(text, record) => (
                                                <span>{format(new Date(text), 'dd/MM/yyyy HH:mm:ss')}</span>
                                            )}
                                        ></Column>
                                        <Column
                                            title="Tổng tiền"
                                            key="totalPrice"
                                            render={(_, record) => (
                                                <span>{formatNumberWithCommas(record.totalPrice)}đ</span>
                                            )}
                                        ></Column>

                                        <Column
                                            title="Trạng thái"
                                            key="state"
                                            render={(_, record) => (
                                                <Tag
                                                    style={{
                                                        fontWeight: '700',
                                                        color: record.state === 'Paid' ? 'green' : 'navy',
                                                        backgroundColor: record.state === 'Paid' ? 'yellow' : '',
                                                    }}
                                                >
                                                    {' '}
                                                    {record.state}
                                                </Tag>
                                            )}
                                        ></Column>
                                    </Table>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
