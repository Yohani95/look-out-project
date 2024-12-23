'use client';
import React, { useEffect, useState } from 'react';

const AppInfo: React.FC = () => {
  const [lastCommitMessage, setLastCommitMessage] = useState<string>('');
  const [lastCommitDate, setLastCommitDate] = useState<string>('');

  useEffect(() => {
    fetch('/api/lastCommit')
      .then((response) => response.json())
      .then((data) => {
        setLastCommitMessage(data.lastCommitMessage);
        setLastCommitDate(data.lastCommitDate);
      });
  }, []);

  return (
    <div style={{ marginLeft: 'auto' }}>
      <h6 style={{ margin: '0' }}>Fecha del último commit: {lastCommitDate}</h6>
      <h6 style={{ margin: '0' }}>
        Mensaje del último commit: {lastCommitMessage}
      </h6>
    </div>
  );
};

export default AppInfo;
