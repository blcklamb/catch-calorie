import React from 'react';
import styled from 'styled-components';

const BadgesContainer = styled.div`
  width: 1203px;
  height: 700px;
  border-radius: 15px;
  background-color: #94d82d;
  bottom: 10px;
`;

const BadgesText = styled.div`
  width: 1203px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f03e3e;
`;

const Badgeslist = styled.div`
  width: 126px;
  height: 126px;
  background: #ecf8d9;
  border-radius: 15px;
`;
const Badges = () => {
  return (
    <div>
      <BadgesText>Badges</BadgesText>
      <BadgesContainer>
        <Badgeslist />
      </BadgesContainer>
    </div>
  );
};

export default Badges;
