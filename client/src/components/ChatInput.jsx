import { useState } from 'react';
import Button from './Button';
import { styled } from 'styled-components';
import { useUserContext } from '../providers/UserContext';
import { useAddMessageMutation } from '../lib/queries/useAddMessageMutation';

const ChatInput = ({ onMessagesRefetch, receiverId }) => {
  const [text, setText] = useState('');
  const { user: { user_id } = {} } = useUserContext();

  const { mutate: addMessage, error, isPending } = useAddMessageMutation();

  const handleAddMessage = async () => {
    addMessage(
      {
        message: {
          message: text,
          timestamp: new Date().toISOString(),
          from_userId: user_id,
          to_userId: receiverId,
        },
      },
      {
        onSuccess: handleAddMessageSuccess,
      }
    );
  };

  const handleAddMessageSuccess = () => {
    onMessagesRefetch();
    setText('');
  };

  return (
    <Wrapper>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      <SendMessageButton disabled={isPending} onClick={handleAddMessage}>
        Submit
      </SendMessageButton>
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 12px;
  max-width: 100%;
  max-height: 400px;
`;

const SendMessageButton = styled(Button)`
  background-color: #ff4e50;
  color: black;
  width: 50%;
  align-self: center;

  &:hover {
    background-color: #fe4a54;
  }
`;

export default ChatInput;
