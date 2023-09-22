import React from 'react';
import '../index.css';

function Table({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Title</th>
          <th>Name</th>
          <th>Last 10:</th>
          {[...Array(10)].map((_, index) => (
            <th key={index}>{index + 1}</th>
          ))}
          <th>Blitz</th>
          <th>Rapid</th>
          <th>Bullet</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <img src={item.avatar} alt="Profile" width="50" height="50" />
            </td>
            <td>{item.title}</td>
            <td>{item.name}</td>
            <td></td> {/* Last 10: */}
            {item.recent_accuracy.map((accuracy, i) => (
              <td key={i}>{accuracy}</td>
            ))}
            <td>{item.chess_blitz?.last?.rating || 'N/A'}</td> {/* Blitz */}
            <td>{item.chess_rapid?.last?.rating || 'N/A'}</td> {/* Rapid */}
            <td>{item.chess_bullet?.last?.rating || 'N/A'}</td> {/* Bullet */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
