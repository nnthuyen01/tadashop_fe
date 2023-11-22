import React, { Fragment } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollToTopButton from '~/user/components/ScrollToTopButton';
import FacebookMsg from '~/user/components/FacebookMsg';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            {/* <Header /> */}
            {children}
            <FacebookMsg />
            <ScrollToTopButton />
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
