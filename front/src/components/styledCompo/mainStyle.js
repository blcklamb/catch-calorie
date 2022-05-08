import styled from 'styled-components';

export const BodyContainer = styled.div`
  width: 100%;

  align-content: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 180px;
  display: grid;
  padding: 0px 80px;
`;

export const SectionTitle = styled.h1`
  font-family: Jost;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
`;

// Main Hello
export const MainHelloSection = styled.div`
  width: 100%;
  margin: 30px 20px;

  display: flex;
  align-items: center;
  height: 150px;
  align-content: center;
  position: relative;
`;

export const MainHelloBadge = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;

export const MainHello = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  position: relative;
`;

export const MainHelloTitle = styled.h1`
  font-family: Jost;
  font-style: italic;
  font-weight: 700;
  font-size: 40px;
`;

export const MainSection1 = styled.div`
  display: inline-flex;
  margin-bottom: 80px;
  justify-content: center;
  width: 100%;
`;

export const Section = styled.div`
  height: 100%;
  position: relative;
  padding: 30px 40px;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);

  border-radius: 20px;
`;

// 탭 ----------------------------------------------------------------------------------------
export const TrackingForms = styled.div`
  // 폼만 스크롤 범위
  height: 250px;
  overflow: auto;
`;

export const TrackingForm = styled.div`
  display: flex;
  margin: 20px 0;
`;

export const TrackingAutoContainer = styled.div`
  width: 300px;
  margin-right: 20px;
`;

export const TrackingTextFieldContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`;

export const TrackingSwitchContainer = styled.div`
  float: right;
  flex-grow: 1;
  text-align: right;
  margin-right: 10px;
`;

export const TrackingText = styled.span`
  font-weight: 500;
  font-size: revert;
  color: #9d9d9d;
`;

export const TrackingButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  display: inline-flex;
  margin-top: 50px;
`;

export const TrackingLeftButtonContainer = styled.div``;
export const TrackingRightButtonContainer = styled.div`
  flex-grow: 1;
  text-align: right;
`;

export const TrackingPlusButtonContainer = styled.div`
  margin-right: 10px;
`;

// 그래프 ----------------------------------------------------------------------------------------
export const CalorieGraphSection = styled.div`
  text-align: -webkit-center;
  position: relative;
  margin-top: 50px;
`;

export const GraphContainer = styled.div`
  max-width: 400px;
`;

export const GraphOverContainer = styled.div``;

export const GraphOverText = styled.span`
  font-family: Jost;
  font-weight: 700;
  font-size: 20px;
`;

// Tracking List ----------------------------------------------------
export const TrackingListTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  // 행 여백
  border-collapse: separate;
  border-spacing: 0 20px;
`;

// Table Header
export const TrackingListTh = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TrackingTableTitle = styled.span`
  font-family: Jost;
  font-style: italic;
  font-weight: 630;
  font-size: 23px;
`;

export const TrackingListThName = styled(TrackingListTh)`
  width: 40%;
  padding-left: 30px;
`;

export const TrackingListThContent = styled(TrackingListTh)`
  width: 20%;
`;

export const TrackingListThAction = styled(TrackingListTh)`
  width: 5%;
  text-align: center;
  cursor: pointer;
`;

export const TrackingListThEnd = styled(TrackingListThAction)`
  padding-right: 30px;
`;

// Table Body
export const TrackingListTr = styled.tr`
  line-height: 3.5rem;

  // Table Row Glass
  box-sizing: border-box;

  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  box-shadow: 0px 1.334px 20.005px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(40.005px);

  border-radius: 18px;

  // 짝수 열마다 색
  &:nth-child(even) {
    background: rgba(225, 244, 196, 0.3);
    box-shadow: 0px 1.334px 20.005px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(40.005px);

    border-radius: 18px;
  }
`;

export const TrackingListTd = styled.td`
  padding: 10px;
  font-size: large;
`;

export const TrackingListTdAction = styled(TrackingListTd)`
  text-align: -webkit-center;
`;

export const TrackingListTdStart = styled(TrackingListTd)`
  padding-left: 30px;
`;

export const TrackingListTdEnd = styled(TrackingListTdAction)`
  padding-right: 30px;
`;

export const TrackingListTdInput = styled(TrackingListTd)`
  padding: 0px;
  line-height: 0.4rem;
`;

export const TrackingListTdInputText = styled.td`
  text-align: center;
`;

export const TrackingListIcon = styled.img`
  cursor: pointer;
  display: table-cell;
  height: 25px;
`;

export const TrackingListNoTrackingText = styled.h2`
  color: #9d9d9d;
  text-align: center;
`;
