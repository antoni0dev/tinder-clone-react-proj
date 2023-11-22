import { useState } from 'react';
import Button from './Button';
import { styled } from 'styled-components';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  return (
    <Wrapper>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button>Submit</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export default ChatInput;
