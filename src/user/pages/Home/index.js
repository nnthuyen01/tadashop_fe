import React, { useState, useEffect, Fragment } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import ProductItem from '~/user/components/ProductItem';
import ModalProduct from '~/user/components/ModalProduct';
import Banners from '~/user/components/Banners';
import SliderHome from '~/user/components/SliderHome';
import HeaderHome from './HeaderHome';

function Home() {
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    // Product

    // Show Modal1 Product
    const [showModal, setShowModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleShowModal = (productId) => {
        setScrollPosition(window.scrollY);
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const handleHideModal = () => {
        window.scrollTo(0, scrollPosition);
        setShowModal(false);
    };

    const [cartItemCount, setCartItemCount] = useState(0);

    const handleAddToCartSuccess = () => {
        // Update the cart item count or perform any other actions needed
        setCartItemCount((prevCount) => prevCount + 1);
    };

    return (
        <Fragment>
            <HeaderHome key={cartItemCount} />
            {/* <!-- Slider --> */}
            <SliderHome />

            {/* <!-- Banners --> */}
            <Banners />

            {/* <!-- Product --> */}
            <ProductItem handleShowModal={handleShowModal} title={true} pagination={true} />

            {/* <!-- Modal1 --> */}
            {showModal && (
                <ModalProduct
                    handleHideModal={handleHideModal}
                    productId={selectedProductId}
                    onAddToCartSuccess={handleAddToCartSuccess}
                />
            )}

            <section className="hero-section">
                <div className="container">
                    <div className="card-container">
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur1.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí thiết kế</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur2.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí In Tên Số</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur3.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Miễn Phí Giao Hàng</h3>
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-background"
                                style={{ backgroundImage: "url('assets/images/blur4.jpg')" }}
                            ></div>
                            <div className="content-card">
                                <h3 className="card-heading">Đa dạng chất vãi</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}

            {/* <!-- Back to top --> */}
        </Fragment>
    );
}

export default Home;
