import React, { Fragment } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollToTopButton from '~/user/components/ScrollToTopButton';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            {/* <Header /> */}
            {children}
            <ScrollToTopButton />
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
