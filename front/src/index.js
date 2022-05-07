import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import Container from './Container';

import Footer from '../src/components/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //   <React.StrictMode>
  <>
    <Container>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </Container>
    <Footer></Footer>
  </>,
  //   </React.StrictMode>,
);
