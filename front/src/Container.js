import React from 'react';

const Container = ({ children }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1920px' }}>{children}</div>
      </div>
    </>
  );
};

export default Container;
