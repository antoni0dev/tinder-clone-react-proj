import { styled } from 'styled-components';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../lib/constants';

const ErrorNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ErrorBoundaryMessage>
        Dang! This page doesn&apos;t exist! Please to go&nbsp;
        <GoBackButton onClick={() => navigate(PATHS.home)}>
          home page
        </GoBackButton>
      </ErrorBoundaryMessage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorBoundaryMessage = styled.p`
  padding: 12px;
  color: white;
  background-color: #fe336e;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
`;

const GoBackButton = styled(Button)`
  padding: 0;
  text-decoration: underline;
  text-transform: lowercase;
  font-weight: 500;
`;

export default ErrorNotFoundPage;
