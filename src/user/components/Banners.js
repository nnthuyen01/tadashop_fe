import { Link } from 'react-router-dom';

function Banners() {
    return (
        <>
            {/* <!-- Banner --> */}
            <div className="sec-banner bg0 p-t-95 p-b-55">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div className="block1 wrap-pic-w">
                                <img src="assets/images/banner1.jpg" alt="IMG-BANNER" />
                                <Link
                                    to={'/shop'}
                                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">Sân Khách</span>

                                        <span className="block1-info stext-102 trans-04">Manchester United</span>
                                    </div>

                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">Mua Ngay</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-6 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div className="block1 wrap-pic-w">
                                <img src="assets/images/banner2.jpg" alt="IMG-BANNER" />

                                <Link
                                    to={'/shop'}
                                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">Sân Nhà</span>

                                        <span className="block1-info stext-102 trans-04">Manchester United</span>
                                    </div>

                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">Mua Ngay</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div className="block1 wrap-pic-w">
                                <img src="assets/images/banner3.jpg" alt="IMG-BANNER" />

                                <Link
                                    to={'/shop'}
                                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">Nhà Vua</span>

                                        <span className="block1-info stext-102 trans-04">PSG</span>
                                    </div>

                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">Mua Ngay</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div className="block1 wrap-pic-w">
                                <img src="assets/images/banner4.jpg" alt="IMG-BANNER" />

                                <Link
                                    to={'/shop'}
                                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">Cá Tính</span>

                                        <span className="block1-info stext-102 trans-04">Barcelona</span>
                                    </div>

                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">Mua Ngay</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                            {/* <!-- Block1 --> */}
                            <div className="block1 wrap-pic-w">
                                <img src="assets/images/banner5.jpg" alt="IMG-BANNER" />

                                <Link
                                    to={'/shop'}
                                    className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="block1-txt-child1 flex-col-l">
                                        <span className="block1-name ltext-102 trans-04 p-b-8">Nổi Bật</span>

                                        <span className="block1-info stext-102 trans-04">Arsenal</span>
                                    </div>

                                    <div className="block1-txt-child2 p-b-4 trans-05">
                                        <div className="block1-link stext-101 cl0 trans-09">Mua Ngay</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banners;
