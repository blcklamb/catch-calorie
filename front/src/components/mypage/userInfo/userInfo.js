import UserCard from '../../user/UserCard';

import { BadgesContainer, UserContainer } from '../../styledCompo/LoginStyle';

import Flippy, { FrontSide, BackSide } from 'react-flippy';

import UserGraph from './userGraph';
import UserTrackingList from './UserTrackingList';

function UserInfo({ currentUserInfo }) {
  return (
    <>
      <BadgesContainer>
        <UserContainer style={{ zIndex: '55' }}>
          <UserCard currentUserInfo={currentUserInfo}></UserCard>
          <Flippy flipOnClick={true}>
            <FrontSide
              style={{
                width: '500px',
                height: '600px',
                borderRadius: '27.3186px',
                zIndex: '300',
                padding: '30px',

                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.3)',
                boxShadow: '0px 5.334px 40.005px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10.005px)',
              }}
            >
              <UserTrackingList currentUserInfo={currentUserInfo}></UserTrackingList>
            </FrontSide>
            <BackSide
              style={{
                width: '500px',
                height: '600px',
                borderRadius: '27.3186px',
                zIndex: '300',
                padding: '35px',

                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.3)',
                boxShadow: '0px 5.334px 40.005px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10.005px)',
              }}
            >
              <UserGraph currentUserInfo={currentUserInfo}></UserGraph>
            </BackSide>
          </Flippy>
        </UserContainer>
      </BadgesContainer>
    </>
  );
}

export default UserInfo;
