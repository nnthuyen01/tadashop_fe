import React, { useLayoutEffect, useState } from 'react';

// modal product
import 'magnific-popup/dist/jquery.magnific-popup.min';
import { useParams } from 'react-router-dom';
import 'select2';
import HeaderPages from '~/user/components/HeaderPages';

import ModalProduct from '~/user/components/ModalProduct';
import ProductLeagues from '~/user/components/ProductLeagues';

function ProductLeague() {
    useLayoutEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const { league } = useParams();

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
            <ProductLeagues handleShowModal={handleShowModal} query={league} pagination={true} />

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
