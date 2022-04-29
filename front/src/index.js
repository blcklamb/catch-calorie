import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 리코일 관련 컴포넌트 */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
