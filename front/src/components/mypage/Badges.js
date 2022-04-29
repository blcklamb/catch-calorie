import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Yoga from './yoga.png';

const BadgesContainer = styled.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  background-color: #94d82d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgesWrap = styled.div`
  width: 1100px;
  height: 600px;

  display: flex;
  gap: 20px 8%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* background-color: white; */

  position: absolute;
`;

const Badgesbox = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 18px;
  background: #ecf8d9;
  box-shadow: 5px 5px 18px #668d2a, -5px -5px 18px #d8ff5a;

  border: none;

  :hover {
    box-shadow: inset 8px 8px 16px #c88383, inset -8px -8px 16px #faa3a3;
  }
`;

const BadgesText = styled.div`
  width: 1203px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
  position: relative;
  left: 30px;
`;

const Badges = () => {
  const [badges, setBadges] = useState([]);

  //   useEffect(() => {
  //     Api.get('badges').then((res) => setBadges(res.badges));
  //   }, []);

  return (
    <div>
      <BadgesText>Badges</BadgesText>
      <BadgesContainer>
        <BadgesWrap>
          <Badgesbox src={Yoga} />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
          <Badgesbox />
        </BadgesWrap>

        {/* {badges.map((user) => (
          <Badgesbox key={badges} />
        ))} */}
      </BadgesContainer>
    </div>
  );
};

export default Badges;
