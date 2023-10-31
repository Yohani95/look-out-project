import React, { useState } from 'react';
import { FaAngleLeft, FaAngleDown } from 'react-icons/fa';

const BoxInfo = ({ children, additionalContent,title,startShow=true }) => {
  const [collapsed, setCollapsed] = useState(startShow);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const buttonIcon = collapsed ? <FaAngleLeft /> : <FaAngleDown />;

  return (
    <div className="card mb-3">
      <div
        className="card-header d-flex justify-content-between"
        onClick={toggleCollapsed}
        style={{ cursor: 'pointer', color: '#2f4bce' }}//,background:'#D9E2F9',height:'50px'
      >
          <h4>{title}</h4>
        <div className="card-tools">
          {buttonIcon}
        </div>
      </div>
      {collapsed && (
        <div className="card-body py-4">
          {children}
          {additionalContent}
        </div>
      )}
    </div>
  );
};

export default BoxInfo;
