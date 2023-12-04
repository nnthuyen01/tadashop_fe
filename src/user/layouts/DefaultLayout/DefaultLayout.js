import React, { Fragment } from 'react';

import Footer from '../components/Footer/Footer';
import ScrollToTopButton from '~/user/components/ScrollToTopButton';
import FacebookMsg from '~/user/components/FacebookMsg';
import DialogflowChat from '~/user/components/DialogflowChat';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            {children}
            {/* <FacebookMsg /> */}
            <DialogflowChat />
            <ScrollToTopButton />
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
