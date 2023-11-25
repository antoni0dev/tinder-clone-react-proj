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
  letter-spacing: var(--letter-spacing);
  line-height: var(--line-height);
`;

const VARIANTS = {
  xl: {
    '--fontSize': '99px',
    '--letter-spacing': 1.7,
  },
  h1: {
    '--fontSize': '50px',
  },
  p: {
    '--fontSize': '14px',
  },
};

export default Typography;
