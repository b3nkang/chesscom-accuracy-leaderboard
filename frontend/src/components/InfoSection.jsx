import React, { useState } from 'react';
import '../App.css';

function InfoSection() {
  const [isInfoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!isInfoVisible);
  };

  return (
    <div className="info-section">
      {isInfoVisible && (
        <div className="info-content">
          <p>Lorem ispum njkngjlnsioueglabkranpi test</p>
          {/*  */}
        </div>
      )}
      <button onClick={toggleInfo}>
        {isInfoVisible ? 'Hide' : 'About'}
      </button>
    </div>
  );
}

export default InfoSection;
