import React, { Component } from 'react';
import images from '~/assets/images';

class HomeAdmin extends Component {
    render() {
        return (
            <div>
                <h2
                    style={{
                        fontSize: '27px',
                        color: '#001529',
                        marginBottom: '20px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Welcome to the admin page
                </h2>
                <img
                    src={images.board}
                    alt="Animated_Image"
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        margin: '0 auto',
                    }}
                />
            </div>
        );
    }
}

export default HomeAdmin;
