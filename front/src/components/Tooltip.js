import React from 'react';
import styled from 'styled-components';
import { Header, Button, Popup, Grid } from 'semantic-ui-react';
import Yoga from '../../src/components/mypage/yoga.png';

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

const Badgesboxs = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 18px;
  background: #ecf8d9;

  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    box-shadow: inset 8px 8px 16px #c88383, inset -8px -8px 16px #faa3a3;
  }
`;

const Tooltip = () => (
  <Popup
    style={{ borderRadius: '18px', backgroundColor: '#E1F4C4', border: 'none' }}
    trigger={
      <Badgesboxs>
        <img src={Yoga} style={{ width: 200 }}></img>
      </Badgesboxs>
    }
    flowing
    hoverable
  >
    <Grid centered divided columns={1}>
      <Grid.Column textAlign="center">
        <Header as="h2">뱃지 이름</Header>
        <p>
          <b>2</b> 뱃지 정보
        </p>
        <Button style={{ borderRadius: '8px', backgroundColor: '#94D82D' }}>
          프로필로 설정하기
        </Button>
      </Grid.Column>
    </Grid>
  </Popup>
);

export default Tooltip;
