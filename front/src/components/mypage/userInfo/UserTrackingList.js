import React from 'react';


import {
} from '../../styledCompo/LoginStyle';

import TrackingLists from '../../trackingList/TrackingLists';

function UserTrackingList({ currentUserInfo }) {
  return (
    <>
      {/* <UserCardFrame> */}
      <TrackingLists />
      {/* </UserCardFrame> */}
    </>
  );
}

export default UserTrackingList;
