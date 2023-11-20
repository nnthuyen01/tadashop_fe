import React, { useEffect, useState } from 'react';
import HeaderPages from '~/user/components/HeaderPages';

import axios from 'axios';
import { API_URL } from '~/config/constant';
import { Link, useNavigate, useParams } from 'react-router-dom';
import images from '~/assets/images';

function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(API_URL + 'orderDetail/' + id)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    setOrderDetail(response.data);

                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);
    function formatNumberWithCommas(number) {
        if (number !== undefined && number !== null) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            // Handle the case when number is undefined or null
            return '';
        }
    }
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
                    <Link to="/order" className="stext-107 cl8 hov-cl1 trans-04">
                        Đơn hàng
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>
                    <span className="stext-107 cl4">Chi tiết đơn hàng</span>
                </div>
            </div>
            <div className="container">
                {loading ? (
                    <div style={{ textAlign: 'center' }}>Đang tải dữ liệu...</div>
                ) : (
                    <div>
                        <section className="h-100 gradient-custom">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-lg-10 col-xl-8">
                                        <div className="card1" style={{ borderRadius: '10px' }}>
                                            <div className="card-header px-4 py-5">
                                                <h5
                                                    className="mtext-109"
                                                    style={{ color: '#fff', textAlign: 'center' }}
                                                >
                                                    Order Detail
                                                </h5>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <p
                                                        className="mtext-105 mb-0"
                                                        style={{
                                                            color:
                                                                orderDetail.order?.state === 'Paid'
                                                                    ? 'green'
                                                                    : '#001529',
                                                            backgroundColor:
                                                                orderDetail.order?.state === 'Paid' ? 'yellow' : '',
                                                            padding: orderDetail.order?.state === 'Paid' ? '10px' : '',
                                                            border:
                                                                orderDetail.order?.state === 'Paid'
                                                                    ? '1px solid #000000'
                                                                    : '',
                                                        }}
                                                    >
                                                        {orderDetail.order?.state}
                                                    </p>
                                                    {/* <button className="btn btn-success btn-sm">
                                                        Update order status
                                                    </button> */}
                                                </div>
                                                <div className="d-flex justify-content-between pt-2 mb-4">
                                                    <p className="mtext-102 mb-0">
                                                        Receiver:{' '}
                                                        <span style={{ color: '#6c757d' }}>
                                                            {orderDetail.order?.receiverName}
                                                        </span>
                                                    </p>
                                                    <p className="mtext-102 mb-0">
                                                        Phone:{' '}
                                                        <span style={{ color: '#6c757d' }}>
                                                            {orderDetail.order?.receiverPhone}
                                                        </span>
                                                    </p>
                                                    <p className="mtext-102 mb-0">
                                                        Account:{' '}
                                                        <span style={{ color: '#6c757d' }}>
                                                            {orderDetail.order?.orderUser?.username}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between pt-2 mb-4">
                                                    <p className="mtext-102 mb-0">
                                                        Address:{' '}
                                                        <span style={{ color: '#6c757d' }}>
                                                            {orderDetail.order?.deliveryAddress}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="card1 shadow-0 border mb-4">
                                                    {orderDetail?.items?.map((item, index) => (
                                                        <div key={index} className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <img
                                                                        src={
                                                                            API_URL +
                                                                            'products/images/' +
                                                                            item.product?.image?.fileName
                                                                        }
                                                                        loading="lazy"
                                                                        alt={item.itemName}
                                                                        className="img-fluid"
                                                                    ></img>
                                                                </div>
                                                                <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="stext-115 mb-0">{item.itemName}</p>
                                                                </div>
                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="stext-115 mb-0  ">
                                                                        Size: {item.productSize?.size}
                                                                    </p>
                                                                </div>

                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="stext-115 mb-0  ">
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                    <p className="stext-115 mb-0  ">
                                                                        {formatNumberWithCommas(item.totalPrice)}đ
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <hr
                                                                className="mb-4"
                                                                style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="d-flex justify-content-between pt-2">
                                                    <p className="mtext-102 mb-0">Invoice information</p>
                                                    <p className="stext-115 mb-0">
                                                        <span className="mtext-102 me-4">
                                                            {orderDetail.order?.totalPrice !== undefined && (
                                                                <>
                                                                    Total amount:{' '}
                                                                    {formatNumberWithCommas(
                                                                        orderDetail.order.totalPrice,
                                                                    )}
                                                                    đ
                                                                </>
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="d-flex justify-content-between pt-2">
                                                    <p className="stext-115 mb-0">
                                                        ID:
                                                        {orderDetail.order?.id}
                                                    </p>
                                                    <p className="stext-115 mb-0">
                                                        <span className="mtext-102 me-4">
                                                            {orderDetail.order?.totalPrice !== undefined && (
                                                                <>
                                                                    Discount:{' '}
                                                                    {formatNumberWithCommas(orderDetail.order.priceOff)}
                                                                    đ
                                                                </>
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="stext-115 mb-0">
                                                        Date:
                                                        {orderDetail.order?.createTime}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className="card-footer border-0 px-4 py-5"
                                                style={{
                                                    backgroundColor: '#dc0021',
                                                    borderBottomLeftRadius: '10px',
                                                    borderBottomRightRadius: '10px',
                                                }}
                                            >
                                                <h5 className="d-flex align-items-center justify-content-end text-white  mb-0">
                                                    Total payment:
                                                    <span className="text-uppercase">
                                                        {orderDetail.order?.totalPrice !== undefined && (
                                                            <>{formatNumberWithCommas(orderDetail.order.totalPrice)}</>
                                                        )}
                                                    </span>
                                                    đ<span className="h2 mb-0 ms-2"></span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderDetail;
