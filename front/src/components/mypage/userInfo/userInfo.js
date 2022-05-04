import UserCard from '../../user/UserCard';

import { BadgesContainer, UserContainer } from '../../styledCompo/uesrStyle';

import UserGraph from './userGraph';
import UserTrackingList from './UserTrackingList';

function UserInfo({ currentUserInfo }) {
  return (
    <>
      <BadgesContainer>
        <UserContainer>
          <UserCard currentUserInfo={currentUserInfo}></UserCard>
          <UserTrackingList currentUserInfo={currentUserInfo}></UserTrackingList>
          <UserGraph currentUserInfo={currentUserInfo}></UserGraph>
        </UserContainer>
      </BadgesContainer>
    </>
  );
}

export default UserInfo;
