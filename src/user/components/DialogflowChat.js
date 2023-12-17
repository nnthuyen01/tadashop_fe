import React, { useEffect, useRef } from 'react';

const DialogflowChat = () => {
    const messengerRef = useRef(null);

    useEffect(() => {
        const setPlaceholderTimeout = setTimeout(() => {
            const dfMessenger = messengerRef.current;

            if (dfMessenger) {
                const chatElement = dfMessenger.shadowRoot?.querySelector('df-messenger-chat');

                if (chatElement) {
                    const userInputElement = chatElement.shadowRoot?.querySelector('df-messenger-user-input');

                    if (userInputElement) {
                        const inputElement = userInputElement.shadowRoot?.querySelector('.input-box-wrapper > input');

                        if (inputElement) {
                            inputElement.placeholder = 'Bạn hỏi gì đi...';
                        }
                    }
                }
            }
        }, 1000);

        return () => clearTimeout(setPlaceholderTimeout);
    }, []);

    return (
        <>
            <style>
                {`
                df-messenger {
                    --df-messenger-bot-message: #385b73;
                    --df-messenger-button-titlebar-color: #ffe300;
                    --df-messenger-chat-background-color: #f5f5f5;
                    --df-messenger-font-color: #fff;
                    --df-messenger-send-icon: #385b73;
                    --df-messenger-user-message: #61af3b;
                    --df-messenger-button-titlebar-font-color: #dc0021;
                }
            
                #widgetIcon {
                    background-color: #ffe300;
                }
            `}
            </style>

            <df-messenger
                ref={messengerRef}
                intent="Welcome"
                chat-icon="https://res.cloudinary.com/thuyen2k1/image/upload/v1701497905/FAVICON_fhpvnt.png"
                chat-title="TADA Store"
                agent-id="04b53bdb-6114-4950-a1d1-31ba7e96ac12"
                language-code="vi"
            ></df-messenger>
        </>
    );
};

export default DialogflowChat;
