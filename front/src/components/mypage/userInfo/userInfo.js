import UserCard from '../../user/UserCard';

import { BadgesContainer, UserContainer } from '../../styledCompo/LoginStyle';

import Flippy, { FrontSide, BackSide } from 'react-flippy';

import UserGraph from './userGraph';
import UserTrackingList from './UserTrackingList';

function UserInfo({ currentUserInfo }) {
  return (
    <>
      <BadgesContainer>
        <UserContainer>
          <UserCard currentUserInfo={currentUserInfo}></UserCard>
          <Flippy
            flipOnClick={true}
            style={{
              width: '500px',
              height: '600px',
              borderRadius: '30px',

              // backgroundColor: ' #91c13d',
            }}
          >
            <FrontSide
              style={{
                width: '500px',
                height: '600px',
                borderRadius: '30px',
                // backgroundColor: ' #ffffff',
              }}
            >
              <UserTrackingList currentUserInfo={currentUserInfo}></UserTrackingList>
            </FrontSide>
            <BackSide
              style={{
                width: '500px',
                height: '600px',
                borderRadius: '30px',
                // backgroundColor: ' #ffffff',
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
