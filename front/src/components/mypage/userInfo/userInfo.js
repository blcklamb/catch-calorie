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
              width: 'auto',
              height: 'auto',

              // backgroundColor: ' #91c13d',
            }}
          >
            <FrontSide
              style={{
                width: 'auto',
                height: 'auto',

                backgroundColor: ' #ffffff',
              }}
            >
              <UserTrackingList currentUserInfo={currentUserInfo}></UserTrackingList>
            </FrontSide>
            <BackSide>
              <UserGraph currentUserInfo={currentUserInfo}></UserGraph>
            </BackSide>
          </Flippy>
        </UserContainer>
      </BadgesContainer>
    </>
  );
}

export default UserInfo;
