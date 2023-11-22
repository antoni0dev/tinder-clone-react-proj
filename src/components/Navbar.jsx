import { styled } from 'styled-components';
import Logo from './Logo';
import Button from './Button';

const Navbar = ({ minimal = true, openModal = () => {} }) => {
  const authToken = false;

  return (
    <Wrapper>
      <Logo variant={minimal ? 'minimal' : 'contrasting'} />
      {!minimal && (
        <NavButton onClick={openModal}>
          {authToken ? 'Sign out' : 'Log in'}
        </NavButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding-left: 24px;
  height: 70px;
  align-items: center;
  justify-content: space-between;
`;

const NavButton = styled(Button)`
  --textColor: ${({ theme }) => theme.palette.primary};
  --background: ${({ theme }) => theme.palette.white};
  --hoverBackground: linear-gradient(260deg, #fe3072, #ff5948);
  --borderRadius: 12px;
  --fontSize: 1rem;

  &:hover {
    color: white;
  }

  padding: 10px 20px;
  margin: 24px 26px 20px 0px;
`;

export default Navbar;
