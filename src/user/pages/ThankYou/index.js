import { Link, useParams } from 'react-router-dom';
import HeaderPages from '~/user/components/HeaderPages';
import { API_URL } from '~/config/constant';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Thankyou() {
    const [loading, setLoading] = useState(true);

    const { idOrder } = useParams();
    const [order, setOrder] = useState();
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        axios
            .get(API_URL + `orderDetail/${idOrder}`)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setOrder(response.data.order);

                    setCartProducts(response.data.items);
                    const total = response.data.items.reduce((total, item) => {
                        return total + item.quantity * item.totalPrice;
                    }, 0);
                    setTotalPrice(total);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, []);
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    console.log(order);
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />

            <section className="bg0 p-t-20 p-b-60">
                <div className="container">
                    <div className="grid__row">
                        <div className="grid__column-7">
                            <div className="main-checkout">
                                <div className="main-content">
                                    <div className="step-section">
                                        <div className="section-header" style={{ display: 'flex' }}>
                                            <div>
                                                <svg
                                                    width="50"
                                                    height="50"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    stroke="#12a700"
                                                    strokeWidth="2"
                                                    style={{ marginRight: '0.75em' }}
                                                >
                                                    <path d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"></path>
                                                    <path d="M15 24.51l7.307 7.308L35.125 19"></path>
                                                </svg>
                                            </div>
                                            <div
                                                className="right-header"
                                                style={{ fontSize: '16px', fontWeight: '400', lineHeight: 'initial' }}
                                            >
                                                <div style={{ fontSize: '18px', fontWeight: '700' }}>
                                                    {' '}
                                                    ĐẶT HÀNG THÀNH CÔNG
                                                </div>
                                                <p style={{ margin: 0 }}>Mã đơn hàng: #{order?.id}</p>
                                                <p style={{ margin: 0 }}>Cảm ơn bạn đã mua hàng!</p>
                                            </div>
                                        </div>
                                        <div className="section-main">
                                            <div className="info-success">
                                                <div
                                                    className="head-section-main"
                                                    style={{ fontSize: '18px', color: '#333' }}
                                                >
                                                    Thông tin giao hàng
                                                </div>
                                                <div className="">
                                                    <p style={{ margin: 0 }}>{order?.receiverName}</p>
                                                    <p style={{ margin: 0 }}>{order?.receiverPhone}</p>
                                                    <p style={{ margin: 0 }}>{order?.deliveryAddress}</p>
                                                </div>
                                            </div>
                                            <div className="info-success">
                                                <div
                                                    className="head-section-main"
                                                    style={{ fontSize: '18px', color: '#333', marginTop: '10px' }}
                                                >
                                                    Phương thức thanh toán
                                                </div>
                                                <div className="">
                                                    <p>{order?.payment?.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section-footer">
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    justifyContent: 'flex-end',
                                                    width: '100%',
                                                }}
                                            >
                                                <div
                                                    className="flex-c-m stext-101 cl0 size-119 bg1 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                                                    // onClick={() => console.log(checkout)}
                                                    // onClick={() => handleCheckout(checkout)}
                                                >
                                                    Thanh toán
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column-5">
                            <div className="sidebar-checkout">
                                <div
                                    className="section-header"
                                    style={{ marginBottom: '1.5em', fontSize: '18px', fontWeight: '700' }}
                                >
                                    Thông tin đơn hàng
                                </div>

                                <table className="table-payment">
                                    <thead>
                                        <tr>
                                            <th className="th-payment">Hình ảnh</th>
                                            <th className="th-payment">Mô tả</th>
                                            <th className="th-payment">Size</th>
                                            <th className="th-payment">Số lượng</th>
                                            <th className="th-payment">Giá</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <tbody>
                                            <tr>
                                                <td className="td-payment" colSpan="6" style={{ textAlign: 'center' }}>
                                                    <div className="loading-indicator">Đang tải dữ liệu...</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            {cartProducts.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="td-payment">
                                                        <img
                                                            src={
                                                                API_URL +
                                                                'products/images/' +
                                                                item.product.image.fileName
                                                            }
                                                            loading="lazy"
                                                            alt="IMG-PRODUCT"
                                                            style={{ height: '60px' }}
                                                        />
                                                    </td>
                                                    <td className="td-payment">{item.itemName}</td>
                                                    <td className="td-payment">{item.productSize.size}</td>
                                                    <td className="td-payment">{item.quantity}</td>
                                                    <td className="td-payment">
                                                        {' '}
                                                        {formatNumberWithCommas(item.totalPrice)}₫
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>

                                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-t-20 m-lr-0-xl p-lr-15-sm">
                                    <h4 className="mtext-109 cl2 p-b-30">ĐƠN HÀNG</h4>

                                    <div className="flex-w flex-t p-b-13">
                                        <div style={{ width: '40%' }}>
                                            <span className="stext-110 cl2">Tạm tính:</span>
                                        </div>

                                        <div style={{ width: '60%' }}>
                                            <span className="mtext-110 ">{formatNumberWithCommas(totalPrice)}</span>
                                        </div>
                                    </div>
                                    <div className="flex-w flex-t bor12 p-b-13">
                                        <div style={{ width: '40%' }}>
                                            <span className="stext-110 cl2">Phí vận chuyển:</span>
                                        </div>

                                        <div style={{ width: '60%' }}>
                                            <span className="mtext-110 ">-</span>
                                        </div>
                                    </div>

                                    <div className="flex-w flex-t p-t-27 p-b-10">
                                        <div style={{ width: '40%' }}>
                                            <span className="mtext-109 cl2">Tổng tiền:</span>
                                        </div>

                                        <div className="p-t-1" style={{ width: '60%' }}>
                                            <span className="mtext-109 " style={{ color: '#e32124' }}>
                                                {formatNumberWithCommas(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Thankyou;
