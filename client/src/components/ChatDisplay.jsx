import { styled } from 'styled-components';
import Chat from './Chat';
import ChatInput from './ChatInput';
import Loader from './Loader';
import { useUserContext } from '../providers/UserContext';
import { useGetUserMessagesQuery } from '../lib/queries/useGetUserMessages';
import { useCallback } from 'react';

function formatMessages(user, userMessages, person, personMessages) {
  const messages = [];

  // Add logged user's messages
  userMessages.forEach((message) => {
    messages.push({
      type: 'sent',
      name: user?.first_name,
      img: user?.url,
      text: message.message,
      timestamp: message.timestamp,
    });
  });

  // Add the person's messages
  personMessages.forEach((message) => {
    messages.push({
      type: 'received',
      name: person?.first_name,
      img: person?.url,
      text: message.message,
      timestamp: message.timestamp,
    });
  });

  return messages;
}

const ChatDisplay = ({ clickedUser = {} }) => {
  const { user = {} } = useUserContext();
  const { user_id: clickedUserId } = clickedUser;

  const shouldFetchMessages = Boolean(user.user_id && clickedUserId);

  const {
    data: userMessages = [],
    isLoading: isUserMessagesLoading,
    error: userMessagesError,
    refetch: refetchUserMessages,
  } = useGetUserMessagesQuery(
    {
      fromId: user.user_id,
      recipientId: clickedUserId,
    },
    shouldFetchMessages
  );

  const {
    data: personMessages = [],
    isLoading: isPersonMessagesLoading,
    error: personMessagesError,
    refetch: refetchPersonMessages,
  } = useGetUserMessagesQuery(
    {
      fromId: clickedUserId,
      recipientId: user.user_id,
    },
    shouldFetchMessages
  );

  const messages = formatMessages(
    user,
    userMessages,
    clickedUser,
    personMessages
  );

  const isLoading = isUserMessagesLoading || isPersonMessagesLoading;
  const errorMessage = [userMessagesError, personMessagesError]
    .filter(Boolean)
    .join(', ');

  const handleMessagesRefetch = useCallback(() => {
    refetchUserMessages();
    refetchPersonMessages();
  }, [refetchUserMessages, refetchPersonMessages]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  messages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return (
    <Wrapper>
      <Chat members={[user, clickedUser]} messages={messages} />
      <ChatInput
        onMessagesRefetch={handleMessagesRefetch}
        receiverId={clickedUserId}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

export default ChatDisplay;
