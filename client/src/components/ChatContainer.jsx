import { styled } from 'styled-components';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import ChatDisplay from './ChatDisplay';

const ChatContainer = () => {
  return (
    <Wrapper>
      <ChatHeader />
      <div>
        <OptionButton>Matches</OptionButton>
        <OptionButton>Chat</OptionButton>
      </div>

      <MatchesDisplay />
      <ChatDisplay />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 30%;
  text-align: left;
  z-index: 1;
`;

const OptionButton = styled.button`
  border: none;
  background-color: rgb(255, 255, 255);
  border-bottom: solid 4px rgb(243, 33, 33);
  font-size: 20px;
  margin: 2px;
  padding: 10px;

  &:disabled {
    border-bottom: solid 4px rgb(187, 187, 187);
  }
`;

export default ChatContainer;
