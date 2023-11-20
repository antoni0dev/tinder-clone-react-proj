import { keyframes, styled } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
  return <Spinner />;
};

const Spinner = styled.div`
  border: 4px solid black;
  border-radius: 50%;
  border-top-color: white;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin: auto;
  width: 32px;
  height: 32px;
  animation: ${rotate} 1.5s linear;
  animation-iteration-count: infinite;
  transition-delay: '200ms';
`;

export default Loader;
