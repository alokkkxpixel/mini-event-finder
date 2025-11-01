import React from 'react';

const Loader = ({ size = 'h-5 w-5' }) => {
  return (
    <div
      className={`animate-spin rounded-full ${size} border-b-2 border-white`}
    ></div>
  );
};

export default Loader;