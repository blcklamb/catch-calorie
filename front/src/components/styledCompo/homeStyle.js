import styled from 'styled-components';

// import MainButton from '../main/style/MainButton.js';
import Button from '@mui/material/Button';

export const StartButton = styled.button`
  height: 80px;
  width: 304px;
  border-radius: 22px;
  border-color: #f25b5b;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, RGB(244, 97, 97) 0%, RGB(241, 68, 68) 100%),
    rgba(255, 255, 255, 0.3);

  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  font-size: 2rem;
  color: #94d82d;
  cursor: pointer;
`;

export const StartButton2 = styled.button`
  height: 80px;
  width: 304px;
  border-radius: 22px;
  border-color: #f25b5b;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: linear-gradient(180deg, RGB(244, 97, 97) 0%, RGB(241, 68, 68) 100%),
    rgba(255, 255, 255, 0.3); */
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  font-size: 2rem;
  color: #f25b5b;
  cursor: pointer;
`;

export const FirstPage = styled.section`
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  display: block;
  position: relative;
  z-index: 400;

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.3;
    position: absolute;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
    position: absolute;
  }
`;

export const FirstPageWrapper = styled.div`
  position: absolute;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 200px;
`;

export const FirstPageLogo = styled.div`
  font-family: 'Jost', sans-serif;
  font-weight: 800;
  font-style: italic;
  font-size: 8rem;
  color: #94d82d;
  font-style: bold;
  padding-bottom: 200px;
  padding-top: 20px;

  @media screen and (max-width: 1440px) {
    font-size: 3rem;
  }
`;

export const MainButton = styled(Button)({
  background: 'linear-gradient(45deg, #F03E3E 30%, #F03E3E 90%)',
  border: 0,
  borderRadius: 20,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
});
export const HeadCopy = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  /* background-color: white; */
  margin-bottom: 50px;
  font-size: 2.9rem;
  color: #373737;
  line-height: 50px;
  font-weight: bold;
`;

export const HeadCopy2 = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  /* background-color: white; */
  margin-bottom: 10px;
  font-size: 2rem;
  color: #373737;
  line-height: 20px;
  display: flex;
`;

export const HeadCopy3 = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  /* background-color: white; */
  margin-bottom: 10px;
  font-size: 2rem;
  color: #373737;
  line-height: 10px;
  text-align: end;
  line-height: 20px;
`;

export const BodyCopy = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  /* font-style: italic; */
  /* background-color: yellow; */
  line-height: 30px;
  font-size: 1.5rem;
`;

export const GraphCopy = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  /* background-color: yellow; */
  line-height: 30px;
  /* display: flex;
  justify-content: center;
  text-align: center; */
  font-size: 1.7rem;
  color: #373737;
  position: relative;
  text-align: center;
`;
export const SecondPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #f7fcef;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  padding: 20px;

  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SecondPageLeft = styled.div`
  /* background-color: white; */
  /* border: 1px solid #f0f1f3;
  border-radius: 8px; */
  position: relative;

  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 28px 35px;

  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export const SecondPageRight = styled.div`
  position: relative;
  z-index: 400;
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 55px 55px 55px 55px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;
`;

export const ThirdPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ThirdPageLeft = styled.div`
  z-index: 400;
  width: 750px;
  height: 500px;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;

  /* font-size: 5rem; */
  border: none;
`;

export const ThirdPageRight = styled.div`
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 28px 35px;

  display: flex;
  flex-direction: column;

  justify-content: center;

  border: none;
`;

export const FourthPage = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #f7fcef;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  @media screen and (max-width: 1440px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FourthPageLeft = styled.div`
  /* background-color: white; */
  /* border: 1px solid #f0f1f3;
  border-radius: 8px; */
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 28px 35px;

  flex-direction: column;
  display: flex;

  justify-content: center;
`;

export const FourthPageRight = styled.div`
  z-index: 400;
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 28px 24px 0;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%),
    rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  border-radius: 40px;

  /* font-size: 5rem; */
  border: none;

  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FifthPage = styled.section`
  font-family: 'Jost', sans-serif;
  font-weight: bold;
  /* font-style: italic; */

  position: relative;
  z-index: 400;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ecf8d9;
`;

export const FifthPageCopy = styled.div`
  font-size: 5rem;
  color: #f03e3e;
  font-style: bold;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 100px;
  padding-top: 50px;

  @media screen and (max-width: 1440px) {
    font-size: 2rem;
  }
`;

export const CircleRed1 = styled.div`
  position: absolute;
  z-index: 300;
  width: 470.49px;
  height: 470.49px;
  right: -10%;
  top: 100%;
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

export const CircleGreen1 = styled.div`
  position: absolute;

  right: -55px;
  z-index: 300;
  width: 700px;
  height: 700px;
  left: -15%;
  top: 185%;
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
export const CircleRed2 = styled.div`
  z-index: 200;
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 15%;

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
export const CircleGreen2 = styled.div`
  position: absolute;
  z-index: 200;
  width: 700px;
  height: 700px;
  left: 35%;
  top: 65%;
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
