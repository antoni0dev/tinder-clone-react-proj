import { styled } from 'styled-components';

const Chat = ({ messages }) => {
  console.log('Messages', messages);

  return (
    <ChatDisplay>
      {messages.map((message, index) => (
        <div key={index}>
          <MessageHeader>
            <ImageContainer>
              <img src={message.url} />
            </ImageContainer>
          </MessageHeader>
          <p>{message.text}</p>
        </div>
      ))}
      X
    </ChatDisplay>
  );
};

const ChatDisplay = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const MessageHeader = styled.div``;

const ImageContainer = styled.div``;

export default Chat;
