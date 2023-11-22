import { styled } from 'styled-components';
import Chat from './Chat';
import ChatInput from './ChatInput';

const ChatDisplay = () => {
  return (
    <Wrapper>
      <Chat />
      <ChatInput />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  height: 60vh;
  overflow-y: auto;
`;

export default ChatDisplay;
