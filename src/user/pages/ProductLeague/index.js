import React, { useEffect, useLayoutEffect, useState } from 'react';

// modal product
import 'magnific-popup/dist/jquery.magnific-popup.min';
import { useParams } from 'react-router-dom';
import 'select2';
import HeaderPages from '~/user/components/HeaderPages';

import ModalProduct from '~/user/components/ModalProduct';
import ProductLeagues from '~/user/components/ProductLeagues';
import axios from 'axios';
import { API_URL } from '~/config/constant';

function ProductLeague() {
    useLayoutEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const { league } = useParams();
    const [dataIndex, setDataIndex] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + 'league')
            .then((response) => {
                if (response.status === 200) {
                    const foundIndex = response.data.findIndex((item) => item.name === league);
                    // foundIndex sẽ là index của phần tử trong mảng có data.name === league
                    if (foundIndex !== -1) {
                        setDataIndex(foundIndex);
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi khi fetch dữ liệu từ API:', error);
            });
    }, [league]);
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
        <div style={{ backgroundColor: '#fff' }}>
            <HeaderPages key={cartItemCount} />

            {/* <!-- Product --> */}
            <ProductLeagues handleShowModal={handleShowModal} query={league} index={dataIndex} pagination={true} />

            {/* <!-- Modal1 --> */}

            {showModal && (
                <ModalProduct
                    handleHideModal={handleHideModal}
                    productId={selectedProductId}
                    onAddToCartSuccess={handleAddToCartSuccess}
                />
            )}
        </div>
    );
}

export default ProductLeague;
