import styled from 'styled-components';

const HomeDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: #1e1e1e;
    padding: 20px;

    .chatContainer {
        width: 100%;
        max-width: 800px;
        background: #2e2e2e;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        flex-grow: 1;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .message {
        display: flex;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
        background: #2e2e2e;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .message.assistant {
        background: #3a3f5c;
    }

    .message.user {
        background: #2e2e2e;
    }

    .message span {
        flex-grow: 1;
        padding: 10px;
        font-size: 16px;
        color: #e0e0e0;
    }

    form {
        display: flex;
        margin-top: 10px;
        width: 100%;
    }

    input {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #555;
        border-radius: 4px;
        font-size: 16px;
        background: #2e2e2e;
        color: #e0e0e0;
    }
`;

export default HomeDetails;

