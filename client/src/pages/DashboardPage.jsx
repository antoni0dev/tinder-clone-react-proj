import { styled } from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Loader from '../components/Loader';
import { useGetGenderedUsersQuery } from '../lib/queries/useGetGenderedUsersQuery';
import { useUserContext } from '../providers/UserContext';

const DashboardPage = () => {
  const [lastDirection, setLastDirection] = useState();
  const { user } = useUserContext();

  const { genderedUsers, genderedUsersErrorMsg, isGenderedUsersPending } =
    useGetGenderedUsersQuery({ gender: user?.gender_interest });

  const handleSwiped = (direction, nameToDelete) => {
    console.log('removing' + nameToDelete);
    setLastDirection(direction);
  };

  const handleOutOfFrame = (name) => {
    console.log(name + 'left the screen!');
  };

  if (isGenderedUsersPending) {
    return <Loader />;
  }

  // TODO: create a <Message /> component with different variants to use for error messages
  if (genderedUsersErrorMsg) {
    return <p>There was an error fetching gendered users</p>;
  }

  return (
    <Wrapper>
      <ChatContainer />
      <SwiperWrapper>
        <CardWrapper>
          {genderedUsers
            .filter((genderedUser) => genderedUser.url)
            .map((genderedUser) => (
              <TinderCardWrapper
                key={genderedUser.user_id}
                onSwipe={(dir) => handleSwiped(dir, genderedUser.user_id)}
                onCardLeftScreen={handleOutOfFrame}
              >
                <Card
                  style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                >
                  <h3>{genderedUser.user_id}</h3>
                </Card>
              </TinderCardWrapper>
            ))}
          <SwipeInfo>
            {lastDirection && <p>You swiped {lastDirection}</p>}
          </SwipeInfo>
        </CardWrapper>
      </SwiperWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SwiperWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SwipeInfo = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px;
`;

const Card = styled.div`
  width: 400px;
  height: 650px;
  border-radius: 30px;
  background-size: cover;
  background-position: center;

  & > h3 {
    margin-top: 0px;
  }
`;

const CardWrapper = styled.div`
  width: 400px;
  height: 650px;
`;

const TinderCardWrapper = styled(TinderCard)`
  position: absolute;
`;

export default DashboardPage;
