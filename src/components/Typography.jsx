import { styled } from 'styled-components';

const Typography = ({ variant = 'p', children, ...rest }) => {
  const styles = VARIANTS[variant];

  return (
    <Wrapper as='p' style={styles} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  text-align: center;
  font-size: var(--fontSize);
`;

const VARIANTS = {
  h1: {
    '--fontSize': '50px',
  },
  p: {
    '--fontSize': '14px',
  },
};

export default Typography;
