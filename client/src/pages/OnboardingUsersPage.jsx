import { useCookies } from 'react-cookie';
import Navbar from '../components/Navbar';
import OnboardingForm from '../components/forms/OnboardingForm';
import { styled } from 'styled-components';

const OnboardingUsersPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <Wrapper>
      <Navbar minimal />
      <OnboardingForm userId={cookies.UserId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default OnboardingUsersPage;
