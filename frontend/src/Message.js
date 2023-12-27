import React from 'react';
import { useLocation } from 'react-router-dom';

const Message = () => {
  const location = useLocation();
  const { album } = location.state || {};

  return (
    <div>
      <h2>Message Component</h2>
      <p>{album}</p>
    </div>
  );
};

export default Message;
