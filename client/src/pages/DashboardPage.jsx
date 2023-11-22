import { styled } from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';

const chars = [
  { name: 'Richard Hendircks', url: 'https://i.imgur.com/oPj4A8u.jpeg' },
  { name: 'Erlich Bachman', url: 'https://i.imgur.com/oPj4A8u.jpeg' },
];

const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + 'left the screen!');
  };

  return (
    <Wrapper>
      <ChatContainer />
      <SwiperWrapper>
        <CardWrapper>
          {chars.map((char) => (
            <TinderCardWrapper
              key={chars.name}
              onSwipe={(dir) => swiped(dir, char.name)}
              onCardLeftScreen={() => {}}
            >
              <Card style={{ backgroundImage: 'url(' + char.url + ')' }}>
                <h3>{char.name}</h3>
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

export default Dashboard;
