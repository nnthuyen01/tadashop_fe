import React, { Component } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default class FacebookMsg extends Component {
    render() {
        return (
            <FacebookProvider appId="363776702683907" chatSupport>
                <CustomChat pageId="177460258781408" minimized="true" />
            </FacebookProvider>
        );
    }
}
