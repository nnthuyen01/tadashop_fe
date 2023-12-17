import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderPages from '~/user/components/HeaderPages';

function Blog() {
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages />
            {/* <!-- Title page --> */}
            <section
                className="bg-img1 txt-center p-lr-15 p-tb-92"
                style={{ backgroundImage: "url('assets/images/bg-02.png')" }}
            >
                <h2 className="ltext-105 cl0 txt-center">Blog</h2>
            </section>

            {/* <!-- Content page --> */}
            <section className="bg0 p-t-62 p-b-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-9 p-b-80">
                            <div className="p-r-45 p-r-0-lg">
                                {/* <!-- item blog --> */}
                                <div className="p-b-63">
                                    <Link to="/blogDetail" className="hov-img0 how-pos5-parent">
                                        <img src="assets/images/thumbBlog1.png" alt="IMG-BLOG" />

                                        <div className="flex-col-c-m size-123 bg9 how-pos5">
                                            <span className="ltext-107 cl2 txt-center">31</span>

                                            <span className="stext-109 cl3 txt-center">Oct 2023</span>
                                        </div>
                                    </Link>

                                    <div className="p-t-32">
                                        <h4 className="p-b-15">
                                            <Link to="/blogDetail" className="ltext-108 cl2 hov-cl1 trans-04">
                                                Top 10 Cầu Thủ Mặc Áo Bóng Đá Đẹp Nhất Năm
                                            </Link>
                                        </h4>

                                        <p className="stext-117 cl6">
                                            Bạn có bao giờ tự hỏi ai là những cầu thủ mặc áo bóng đá đẹp nhất năm? Áo
                                            bóng đá không chỉ là một bộ trang phục thể thao, mà còn là biểu tượng của sự
                                            đam mê và niềm tự hào của mỗi cầu thủ. Trong bài viết này, chúng ta sẽ khám
                                            phá về những cầu thủ có phong cách mặc áo bóng đá độc đáo và ấn tượng nhất.
                                            Hãy cùng tìm hiểu nhé!
                                        </p>

                                        <div className="flex-w flex-sb-m p-t-18">
                                            <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                                <span>
                                                    <span className="cl4">By</span> Admin
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                <span>
                                                    FootballStyle
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                {/* <span>8 Comments</span> */}
                                            </span>

                                            <Link to="/blogDetail" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                                                Tiếp tục đọc
                                                <i className="fa fa-long-arrow-right m-l-9"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- item blog --> */}
                                <div className="p-b-63">
                                    <Link to="/blogDetail" className="hov-img0 how-pos5-parent">
                                        <img src="assets/images/thumbBlog2.png" alt="IMG-BLOG" />

                                        <div className="flex-col-c-m size-123 bg9 how-pos5">
                                            <span className="ltext-107 cl2 txt-center">31</span>

                                            <span className="stext-109 cl3 txt-center">Oct 2023</span>
                                        </div>
                                    </Link>

                                    <div className="p-t-32">
                                        <h4 className="p-b-15">
                                            <Link to="/blogDetail" className="ltext-108 cl2 hov-cl1 trans-04">
                                                Top 10 Cầu Thủ Mặc Áo Bóng Đá Đẹp Nhất Năm
                                            </Link>
                                        </h4>

                                        <p className="stext-117 cl6">
                                            Bạn có bao giờ tự hỏi ai là những cầu thủ mặc áo bóng đá đẹp nhất năm? Áo
                                            bóng đá không chỉ là một bộ trang phục thể thao, mà còn là biểu tượng của sự
                                            đam mê và niềm tự hào của mỗi cầu thủ. Trong bài viết này, chúng ta sẽ khám
                                            phá về những cầu thủ có phong cách mặc áo bóng đá độc đáo và ấn tượng nhất.
                                            Hãy cùng tìm hiểu nhé!
                                        </p>

                                        <div className="flex-w flex-sb-m p-t-18">
                                            <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                                <span>
                                                    <span className="cl4">By</span> Admin
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                <span>
                                                    Champion
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                {/* <span>8 Comments</span> */}
                                            </span>

                                            <Link to="/blogDetail" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                                                Tiếp tục đọc
                                                <i className="fa fa-long-arrow-right m-l-9"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- item blog --> */}
                                <div className="p-b-63">
                                    <Link to="/blogDetail" className="hov-img0 how-pos5-parent">
                                        <img src="assets/images/thumbBlog3.png" alt="IMG-BLOG" />

                                        <div className="flex-col-c-m size-123 bg9 how-pos5">
                                            <span className="ltext-107 cl2 txt-center">31</span>

                                            <span className="stext-109 cl3 txt-center">Oct 2023</span>
                                        </div>
                                    </Link>

                                    <div className="p-t-32">
                                        <h4 className="p-b-15">
                                            <Link to="/blogDetail" className="ltext-108 cl2 hov-cl1 trans-04">
                                                Top 10 Cầu Thủ Mặc Áo Bóng Đá Đẹp Nhất Năm
                                            </Link>
                                        </h4>

                                        <p className="stext-117 cl6">
                                            Bạn có bao giờ tự hỏi ai là những cầu thủ mặc áo bóng đá đẹp nhất năm? Áo
                                            bóng đá không chỉ là một bộ trang phục thể thao, mà còn là biểu tượng của sự
                                            đam mê và niềm tự hào của mỗi cầu thủ. Trong bài viết này, chúng ta sẽ khám
                                            phá về những cầu thủ có phong cách mặc áo bóng đá độc đáo và ấn tượng nhất.
                                            Hãy cùng tìm hiểu nhé!
                                        </p>

                                        <div className="flex-w flex-sb-m p-t-18">
                                            <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                                                <span>
                                                    <span className="cl4">By</span> Admin
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>

                                                <span>
                                                    Soccer
                                                    <span className="cl12 m-l-4 m-r-6">|</span>
                                                </span>
                                            </span>

                                            <Link to="/blogDetail" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                                                Tiếp tục đọc
                                                <i className="fa fa-long-arrow-right m-l-9"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3 p-b-80">
                            <div className="side-menu">
                                <div className="bor17 of-hidden pos-relative">
                                    <input
                                        className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                    />

                                    <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                                        <i className="zmdi zmdi-search"></i>
                                    </button>
                                </div>

                                <div className="p-t-55">
                                    <h4 className="mtext-112 cl2 p-b-33">Giải đấu</h4>

                                    <ul>
                                        <li className="bor18">
                                            <Link className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                Ngoại hạng anh
                                            </Link>
                                        </li>

                                        <li className="bor18">
                                            <Link className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                Laliga
                                            </Link>
                                        </li>

                                        <li className="bor18">
                                            <Link className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                Bundesliga
                                            </Link>
                                        </li>

                                        <li className="bor18">
                                            <Link className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                Seria A
                                            </Link>
                                        </li>

                                        <li className="bor18">
                                            <Link className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                                                League 1
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-t-65">
                                    <h4 className="mtext-112 cl2 p-b-33">Sản phẩm đặc trưng</h4>

                                    <ul>
                                        <li className="flex-w flex-t p-b-30">
                                            <Link className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/min-01.jpg" alt="PRODUCT" />
                                            </Link>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <Link className="stext-116 cl8 hov-cl1 trans-04">
                                                    Áo Manchester United
                                                </Link>

                                                <span className="stext-116 cl6 p-t-20">300.000 vnđ</span>
                                            </div>
                                        </li>

                                        <li className="flex-w flex-t p-b-30">
                                            <Link className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/min-01.jpg" alt="PRODUCT" />
                                            </Link>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <Link className="stext-116 cl8 hov-cl1 trans-04">
                                                    Áo Manchester United
                                                </Link>

                                                <span className="stext-116 cl6 p-t-20">300.000 vnđ</span>
                                            </div>
                                        </li>

                                        <li className="flex-w flex-t p-b-30">
                                            <Link className="wrao-pic-w size-214 hov-ovelay1 m-r-20">
                                                <img src="assets/images/min-01.jpg" alt="PRODUCT" />
                                            </Link>

                                            <div className="size-215 flex-col-t p-t-8">
                                                <Link className="stext-116 cl8 hov-cl1 trans-04">
                                                    Áo Manchester United
                                                </Link>

                                                <span className="stext-116 cl6 p-t-20">300.000 vnđ</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* <div className="p-t-55">
                                    <h4 className="mtext-112 cl2 p-b-20">Archive</h4>

                                    <ul>
                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>July 2018</span>

                                                <span>(9)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>June 2018</span>

                                                <span>(39)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>May 2018</span>

                                                <span>(29)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>April 2018</span>

                                                <span>(35)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>March 2018</span>

                                                <span>(22)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>February 2018</span>

                                                <span>(32)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>January 2018</span>

                                                <span>(21)</span>
                                            </Link>
                                        </li>

                                        <li className="p-b-7">
                                            <Link className="flex-w flex-sb-m stext-115 cl6 hov-cl1 trans-04 p-tb-2">
                                                <span>December 2017</span>

                                                <span>(26)</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div> */}

                                <div className="p-t-50">
                                    <h4 className="mtext-112 cl2 p-b-27">Tags</h4>

                                    <div className="flex-w m-r--5">
                                        <Link className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Thể thao
                                        </Link>

                                        <Link className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Thời trang
                                        </Link>

                                        <Link className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Phong cách
                                        </Link>

                                        <Link className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Vô địch
                                        </Link>

                                        <Link className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                                            Thoải mái
                                        </Link>
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

export default Blog;
