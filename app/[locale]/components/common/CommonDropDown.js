import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

function CommonDropDown({ t, title }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLinkClick = () => {
    setShowDropdown(false);
  };
  return (
    <NavDropdown
      title={title}
      show={showDropdown}
      onToggle={handleDropdownToggle}
      id="basic-nav-dropdown"
    >
      {Object.keys(t.link).map((key) => (
        <Link
          key={key}
          href={t.link[key].link}
          className="dropdown-item"
          onClick={handleLinkClick}
        >
          {t.link[key].name}
        </Link>
      ))}
    </NavDropdown>
  );
}

export default CommonDropDown;
