import UserCard from '../../user/UserCard';

import { BadgesContainer, UserContainer } from '../../styledCompo/uesrStyle';

import UserGraph from './userGraph';

function UserInfo({ currentUserInfo }) {
  return (
    <>
      <BadgesContainer>
        <UserContainer>
          <UserCard currentUserInfo={currentUserInfo}></UserCard>
          <UserGraph currentUserInfo={currentUserInfo}></UserGraph>
        </UserContainer>
      </BadgesContainer>
    </>
  );
}

export default UserInfo;
