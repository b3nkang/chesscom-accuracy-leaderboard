import React, { useEffect, useState } from 'react';
import Table from './Table';
import InfoSection from './InfoSection';


function DarkThemePage() {
  const [tableData, setTableData] = useState([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // eslint-disable-next-line
  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  useEffect(() => {
    const apiUrl = 'http://34.150.249.22:8080/getChessPlayers';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="dark-theme-page">
      {/* */}
      <InfoSection isInfoVisible={isInfoVisible} />
      <h1>Chess.com Selected Accuracy Leaderboard</h1>
      <Table data={tableData} />
    </div>
  );
}

export default DarkThemePage;