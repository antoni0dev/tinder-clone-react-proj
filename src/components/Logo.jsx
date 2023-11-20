import { styled } from 'styled-components';

const VARIANTS = {
  minimal: {
    source: '/colored_logo.png',
  },
  contrasting: {
    source: '/white_logo.png',
  },
};

const Logo = ({ variant = 'minimal' }) => {
  const { source } = VARIANTS[variant];

  return <Wrapper src={source} />;
};

const Wrapper = styled.img`
  width: 150px;
  border-radius: 12px;
`;

export default Logo;
