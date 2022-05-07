import styled from 'styled-components';

export const MypageCircleGreen = styled.div`
  z-index: 50;
  position: absolute;
  width: 700px;
  height: 700px;
  right: 0.1%;
  top: 58%;
  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1440px) {
    display: none;
  }
`;

export const MypageCircleRed = styled.div`
  position: absolute;
  z-index: 50;
  width: 350px;
  height: 350px;
  left: 7%;
  top: 49%;

  border-radius: 50%;
  background: radial-gradient(
      87.63% 87.63% at 30.82% 78.65%,
      #c62e2e 0%,
      #e44545 29.02%,
      #f39999 69.13%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1440px) {
    display: none;
  }
`;

export const MypageCircleRed2 = styled.div`
  z-index: 50;
  position: absolute;
  width: 300px;
  height: 300px;
  left: n9%;
  top: 155%;

  border-radius: 50%;
  background: radial-gradient(
    87.63% 87.63% at 30.82% 78.65%,
    rgba(105, 156, 29, 0.9) 0%,
    #77bb41 29.02%,
    #d6eeb1 69.13%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1440px) {
    display: none;
  }
`;
