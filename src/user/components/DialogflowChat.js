import React from 'react';

const DialogflowChat = () => {
    return (
        <df-messenger
            intent="WELCOME"
            chat-title="Tada Store"
            agent-id="04b53bdb-6114-4950-a1d1-31ba7e96ac12"
            language-code="vi"
        ></df-messenger>
    );
};

export default DialogflowChat;
