import React, { useState } from 'react';
import '../App.css';

function InfoSection() {
  const [isInfoVisible, setInfoVisible] = useState(false);

  const toggleInfo = () => {
    setInfoVisible(!isInfoVisible);
  };

  return (
    <div className="info-section">
        <button onClick={toggleInfo}>
        {isInfoVisible ? 'Hide' : 'About'}
        </button>

      {isInfoVisible && (
        <div className="info-content">
          <p class="desc"> After explosive allegations were levied by GM Vladimir Kramnik against GM Hans Niemann in Sept. 2023, specifically with regard to Hans' uncharacterically strong play on Chess.com, Kramnik pointed to Hans' superhuman Chess.com game accuracy ratings to substantiate his accusations. This site, which both uses Chess.com's API to get player rating information and also scrapes accuracy ratings from Chess.com, aims to see if Kramnik's arguments hold water. The data from the APIs is cobbled into a JSON object, injected into a MongoDB Atlas cluster, and retrieved via an API endpoint in the backend.</p>
          {/*  */}
        </div>
      )}
    </div>
  );
}

export default InfoSection;
