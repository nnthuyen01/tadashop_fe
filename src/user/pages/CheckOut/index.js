import React, { useState, useEffect } from 'react';
import HeaderPages from '~/user/components/HeaderPages';
import { Link, useNavigate } from 'react-router-dom';
import './checkout.scss';
import images from '~/assets/images';
import axios from 'axios';
import { API_URL } from '~/config/constant';

function Checkout() {
    const [deliveryOption, setDeliveryOption] = useState('direct'); // 'direct' or 'store'
    const [address, setAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState('card');

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
    };

    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        axios
            .get(API_URL + 'cart')
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    setCartProducts(response.data);
                    const total = response.data.reduce((total, item) => {
                        return total + item.quantity * item.item.price;
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
                    <Link to="/cart" className="stext-107 cl8 hov-cl1 trans-04">
                        Giỏ hàng
                        <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                    </Link>

                    <span className="stext-107 cl4">Thông tin giao hàng</span>
                </div>
            </div>
            <section className="bg0 p-t-20 p-b-60">
                <div className="container">
                    <div className="grid__row">
                        <div className="grid__column-7">
                            <div className="main-checkout">
                                <div className="main-content">
                                    <div className="step-section">
                                        <div className="section-header">Thông tin giao hàng</div>
                                        <div className="section-content section-customer-information">
                                            <div className="fieldset">
                                                <div className="field">
                                                    <div className="field-input-wrapper">
                                                        <label className="field-label">Họ và tên</label>
                                                        <input
                                                            placeholder="Họ và tên"
                                                            className="field-input"
                                                            size="30"
                                                            type="text"
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="field-input-wrapper">
                                                        <label className="field-label">Số điện thoại</label>
                                                        <input
                                                            placeholder="Số điện thoại"
                                                            className="field-input"
                                                            size="30"
                                                            type="text"
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="m-t-15" style={{ fontStyle: 'italic' }}>
                                                    Giao hàng:
                                                </label>
                                                <div>
                                                    <div style={{ display: 'flex', gap: '20px' }}>
                                                        <label style={{ display: 'flex' }}>
                                                            <input
                                                                type="radio"
                                                                value="direct"
                                                                checked={deliveryOption === 'direct'}
                                                                onChange={handleDeliveryOptionChange}
                                                            />
                                                            Giao tận nơi
                                                        </label>

                                                        <label style={{ display: 'flex' }}>
                                                            <input
                                                                type="radio"
                                                                value="store"
                                                                checked={deliveryOption === 'store'}
                                                                onChange={handleDeliveryOptionChange}
                                                            />
                                                            Nhận tại cửa hàng
                                                        </label>
                                                    </div>
                                                    {deliveryOption === 'direct' && (
                                                        <div className="fieldset">
                                                            <div className="field">
                                                                <div className="field-input-wrapper">
                                                                    <label className="field-label">Địa chỉ</label>
                                                                    <input
                                                                        placeholder="Địa chỉ"
                                                                        className="field-input"
                                                                        size="30"
                                                                        type="text"
                                                                        value={address}
                                                                        onChange={handleAddressChange}
                                                                    ></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {deliveryOption === 'store' && (
                                                        <div>
                                                            <p>
                                                                Địa chỉ cửa hàng: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức,
                                                                Thành phố Hồ Chí Minh
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="m-t-15" style={{ fontStyle: 'italic' }}>
                                                    Phương thức thanh toán:
                                                </label>

                                                <div>
                                                    <label style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input
                                                            type="radio"
                                                            value="card"
                                                            checked={paymentOption === 'card'}
                                                            onChange={handlePaymentOptionChange}
                                                        />
                                                        <img
                                                            src={images.cardIcon}
                                                            alt="card-icon"
                                                            style={{ height: '40px' }}
                                                        />
                                                        Chuyển khoản qua ngân hàng
                                                    </label>
                                                    {paymentOption === 'card' && (
                                                        <div className="container-card">
                                                            <h3>Thông tin thẻ</h3>
                                                            <p>
                                                                <span class="highlight">TK NH:</span> 4706205185346
                                                            </p>
                                                            <p>
                                                                <span class="highlight">Nguyễn Ngọc Thuyên</span>
                                                            </p>
                                                            <p>
                                                                <span class="highlight">NH Agribank</span>
                                                            </p>
                                                            <p>Nội dung: Tên + SĐT đặt hàng</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input
                                                            type="radio"
                                                            value="cod"
                                                            checked={paymentOption === 'cod'}
                                                            onChange={handlePaymentOptionChange}
                                                        />
                                                        <img
                                                            src={images.codIcon}
                                                            alt="card-icon"
                                                            style={{ height: '40px' }}
                                                        />
                                                        Thanh toán khi giao hàng (COD)
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="m-t-15">Ghi chú:</label>
                                                <div className="fieldset">
                                                    <div className="field">
                                                        <div className="field-input-wrapper">
                                                            <label className="field-label">Ghi chú</label>
                                                            <input
                                                                placeholder="Ghi chú"
                                                                className="field-input"
                                                                size="30"
                                                                type="text"
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section-footer">
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <div className="flex-c-m stext-101 cl2 size-119  bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                                                    Giỏ hàng
                                                </div>
                                                <div className="flex-c-m stext-101 cl0 size-119 bg1 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
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
                                    <tr>
                                        <th className="th-payment">Hình ảnh</th>
                                        <th className="th-payment">Mô tả</th>
                                        <th className="th-payment">Size</th>
                                        <th className="th-payment">Số lượng</th>
                                        <th className="th-payment">Giá</th>
                                    </tr>
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
                                                                API_URL + 'products/images/' + item.item.image.fileName
                                                            }
                                                            loading="lazy"
                                                            alt="IMG-PRODUCT"
                                                            style={{ height: '60px' }}
                                                        />
                                                    </td>
                                                    <td className="td-payment">{item.item.productName}</td>
                                                    <td className="td-payment">{item.item.size.size}</td>
                                                    <td className="td-payment">{item.quantity}</td>
                                                    <td className="td-payment">
                                                        {' '}
                                                        {formatNumberWithCommas(item.item.price)}₫
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                                <div className="flex-w flex-m m-tb-5" style={{ justifyContent: 'space-between' }}>
                                    <input
                                        className="stext-104 cl2 plh4 size-117 bor20 p-lr-20 m-tb-5"
                                        type="text"
                                        name="coupon"
                                        placeholder="Nhập mã Voucher"
                                    />

                                    <div className="flex-c-m stext-101 cl2 size-118 bg8 hov-btn3 bor20 p-lr-15 trans-04 pointer m-tb-5">
                                        Áp dụng voucher
                                    </div>
                                </div>
                                <div className="bor10 p-lr-40 p-t-30 p-b-40  m-lr-0-xl p-lr-15-sm">
                                    <h4 className="mtext-109 cl2 p-b-30">ĐƠN HÀNG</h4>

                                    <div className="flex-w flex-t p-b-13">
                                        <div style={{ width: '40%' }}>
                                            <span className="stext-110 cl2">Tạm tính:</span>
                                        </div>

                                        <div style={{ width: '60%' }}>
                                            <span className="mtext-110 ">520,000₫</span>
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
                                                520,000₫
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

export default Checkout;
