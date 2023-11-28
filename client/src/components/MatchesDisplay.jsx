import { styled } from 'styled-components';
import { useUserContext } from '../providers/UserContext';
import { useGetMatchesQuery } from '../lib/queries/useGetMatchesQuery';
import Loader from './Loader';

const MatchesDisplay = ({ onUserClick }) => {
  const { matchedUserIds } = useUserContext();

  const {
    data: matchedProfiles = [],
    error,
    isLoading,
  } = useGetMatchesQuery({
    matchedUserIds,
  });

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {matchedProfiles.map((matchedProfile) => {
        return (
          <MatchCard
            key={matchedProfile.user_id}
            onClick={() => onUserClick(matchedProfile)}
          >
            <Image
              src={matchedProfile.url}
              alt={matchedProfile.first_name + ' profile'}
            />
            <p>{matchedProfile.first_name}</p>
          </MatchCard>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const MatchCard = styled.button`
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #bebebe;
`;

export default MatchesDisplay;
