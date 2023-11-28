import { styled } from 'styled-components';

const Button = ({
  tag = 'button',
  size = 'medium',
  variant,
  children,
  ...rest
}) => {
  const style = { ...VARIANTS[variant], ...SIZES[size] };

  return (
    <Wrapper as={tag} style={style} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  // defaults
  font-size: var(--fontSize);
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  padding: 12px 24px;
  border: none;

  // Extending defaults with props
  color: var(--textColor);
  background: var(--background);

  &:hover {
    background: var(--hoverBackground);
    cursor: pointer;
  }

  &:disabled {
    background: #bebebe;
    color: #494444;
  }
`;

export default Button;

const VARIANTS = {
  accent: {
    '--textColor': '#fff',
    '--background': 'linear-gradient(45deg, #fe3072, #ff5948)',
    '--hoverBackground': 'linear-gradient(260deg, #fe3072, #ff5948)',
  },
};

const SIZES = {
  small: {
    '--fontSize': '.75rem',
    '--borderRadius': '12px',
  },
  medium: {
    '--fontSize': '1rem',
    '--borderRadius': '14px',
  },
  large: {
    '--fontSize': '1.2rem',
    '--borderRadius': '18px',
  },
};
