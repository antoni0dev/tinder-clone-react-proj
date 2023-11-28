import { styled } from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import { useMemo, useState } from 'react';
import TinderCard from 'react-tinder-card';
import Loader from '../components/Loader';
import { useGetGenderedUsersQuery } from '../lib/queries/useGetGenderedUsersQuery';
import { useUserContext } from '../providers/UserContext';
import { useUpdateUserMatches } from '../lib/queries/useUpdateUserMatchesMutation';

const DashboardPage = () => {
  const [lastDirection, setLastDirection] = useState();
  const { user = {}, matchedUserIds } = useUserContext();

  const { mutate: updateUserMatches } = useUpdateUserMatches();

  const {
    data: genderedUsers = [],
    error: genderedUsersErrorMsg,
    isLoading: isGenderedUsersLoading,
  } = useGetGenderedUsersQuery({
    gender: user.gender_interest,
    enabled: Boolean(user.gender_interest),
  });

  const filteredGenderedUsers = useMemo(
    () =>
      genderedUsers.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
      ),
    [genderedUsers, matchedUserIds]
  );

  const handleSwiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateUserMatches({ userId: user.user_id, matchedUserId: swipedUserId });
    }

    setLastDirection(direction);
  };

  const handleOutOfFrame = (name) => {
    console.log(name + 'left the screen!');
  };

  if (isGenderedUsersLoading) {
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
          {filteredGenderedUsers.map((genderedUser) => (
            <TinderCardWrapper
              key={genderedUser.user_id}
              onSwipe={(dir) => handleSwiped(dir, genderedUser.user_id)}
              onCardLeftScreen={() => handleOutOfFrame(genderedUser.user_id)}
            >
              <Card
                style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
              >
                <h3>{genderedUser.first_name}</h3>
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
