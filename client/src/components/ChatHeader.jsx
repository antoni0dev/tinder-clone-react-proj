import { styled } from 'styled-components';
import Button from './Button';
import { useUserContext } from '../providers/UserContext';
import { useCookies } from 'react-cookie';
import fallbackProfilePic from '/fallback_profile_photo.jpeg';

const ChatHeader = () => {
  const [cookies, removeCookie] = useCookies([['user']]);
  const { user } = useUserContext();

  const handleLogout = () => {
    removeCookie('UserId', cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken);
  };

  return (
    <Wrapper>
      <ProfileWrapper>
        <ImageWrapper>
          <Image
            src={user.url || fallbackProfilePic}
            alt={`photo of ${user.url}`}
          />
        </ImageWrapper>
        <h3>{user.first_name}</h3>
        <LogoutIcon onClick={handleLogout}>{'<-'}</LogoutIcon>
      </ProfileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(45deg, rgb(254, 48, 114), rgb(255, 89, 64));
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  color: rgb(255, 255, 255);
`;

const LogoutIcon = styled(Button)`
  display: flex;
  align-items: center;
  padding: 20px;
  color: rgb(255, 255, 255);
`;

const ImageWrapper = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin: 10px;
`;

const Image = styled.img`
  width: 100%;
`;

export default ChatHeader;
