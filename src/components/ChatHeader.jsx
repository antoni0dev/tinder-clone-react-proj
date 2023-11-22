import { styled } from 'styled-components';
import Button from './Button';

const ChatHeader = () => {
  return (
    <Wrapper>
      <ProfileWrapper>
        <ImageWrapper>
          <Image src='' />
        </ImageWrapper>
        <h3>UserName</h3>
        <LogoutIcon LogoutIcon>{'<-'}</LogoutIcon>
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

const LogoutIcon = styled.i`
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
