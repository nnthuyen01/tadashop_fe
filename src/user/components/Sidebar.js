function Sidebar({ handleHideSidebar, showSidebar }) {
    return (
        <>
            <aside className={`wrap-sidebar js-sidebar ${showSidebar ? 'show-sidebar' : ''}`}>
                {/* <aside className="wrap-sidebar js-sidebar show-sidebar"> */}
                <div className="s-full js-hide-sidebar" onClick={handleHideSidebar}></div>

                <div className="sidebar flex-col-l p-t-22 p-b-25">
                    <div className="flex-r w-full p-b-30 p-r-27">
                        <div
                            className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar "
                            onClick={handleHideSidebar}
                        >
                            <i className="zmdi zmdi-close"></i>
                        </div>
                    </div>

                    <div className="sidebar-content flex-w w-full p-lr-65 js-pscroll">
                        <ul className="sidebar-link w-full">
                            <li className="p-b-13">
                                <a href="index.html" className="stext-102 cl2 hov-cl1 trans-04">
                                    Trang Chủ
                                </a>
                            </li>

                            <li className="p-b-13">
                                <a href="#" className="stext-102 cl2 hov-cl1 trans-04">
                                    Giỏ hàng
                                </a>
                            </li>

                            <li className="p-b-13">
                                <a href="#" className="stext-102 cl2 hov-cl1 trans-04">
                                    Tài khoản
                                </a>
                            </li>

                            <li className="p-b-13">
                                <a href="#" className="stext-102 cl2 hov-cl1 trans-04">
                                    Đơn hàng
                                </a>
                            </li>

                            <li className="p-b-13">
                                <a href="#" className="stext-102 cl2 hov-cl1 trans-04">
                                    Hỏi đáp
                                </a>
                            </li>
                        </ul>

                        <div className="sidebar-gallery w-full p-tb-30">
                            <span className="mtext-101 cl5">@ TadaStore</span>

                            <div className="flex-w flex-sb p-t-36 gallery-lb">
                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>

                                {/* <!-- item gallery sidebar --> */}
                                <div className="wrap-item-gallery m-b-10">
                                    <a
                                        className="item-gallery bg-img1"
                                        href="images/AoMu3.jpg"
                                        data-lightbox="gallery"
                                        style={{ backgroundImage: "url('assets/images/AoMu3.jpg')" }}
                                    ></a>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-gallery w-full">
                            <span className="mtext-101 cl5">Về chúng tôi</span>

                            <p className="stext-108 cl6 p-t-27">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vulputate
                                hendrerit. Praesent faucibus erat vitae rutrum gravida. Vestibulum tempus mi enim, in
                                molestie sem fermentum quis.
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
