import React, { useEffect, useState } from 'react';
import Table from './Table';

function DarkThemePage() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/getChessPlayers';
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
      <h1>Chess.com Selected Accuracy Leaderboard</h1>
      <Table data={tableData} />
    </div>
  );
}

export default DarkThemePage;