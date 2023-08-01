import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [displayButton, setDisplayButton] = useState(false);

    const handleScroll = () => {
        const windowH = window.innerHeight / 2;
        if (window.scrollY > windowH) {
            setDisplayButton(true);
        } else {
            setDisplayButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {displayButton && (
                <div className="btn-back-to-top" id="myBtn" onClick={scrollToTop} style={{ display: 'flex' }}>
                    <span className="symbol-btn-back-to-top">
                        <i className="zmdi zmdi-chevron-up"></i>
                    </span>
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;
