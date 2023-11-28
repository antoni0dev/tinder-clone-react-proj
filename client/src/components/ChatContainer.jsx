import { styled } from 'styled-components';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import ChatDisplay from './ChatDisplay';
import { useState } from 'react';

const ChatContainer = () => {
  const [clickedUser, setClickedUser] = useState(null);
  const handleUserClick = (matchedProfile) => setClickedUser(matchedProfile);
  const handleRemoveClickedUser = () => setClickedUser(null);

  return (
    <Wrapper>
      <ChatHeader />
      <nav>
        <OptionButton
          is_active={Boolean(!clickedUser).toString()}
          onClick={handleRemoveClickedUser}
        >
          Matches
        </OptionButton>
        <OptionButton
          is_active={Boolean(clickedUser).toString()}
          disabled={!clickedUser}
        >
          Chat
        </OptionButton>
      </nav>

      {!clickedUser && <MatchesDisplay onUserClick={handleUserClick} />}
      {clickedUser && <ChatDisplay clickedUser={clickedUser} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 30%;
  text-align: left;

  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.button`
  border: none;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  border-bottom: ${({ is_active }) =>
    is_active ? 'solid 4px rgb(243, 33, 33)' : 'solid 4px rgb(187, 187, 187)'};
  color: ${({ is_active }) => !is_active && '#dcdcdc'};
  font-size: 20px;
  margin: px;
  padding: 10px;

  &:disabled {
    border-bottom: solid 4px rgb(187, 187, 187);
  }
`;

export default ChatContainer;
