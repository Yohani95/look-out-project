
import React from "react";
import Link from "next-intl/link";
import { NavDropdown } from "react-bootstrap";

function CommonDropDown({t,title}) {
  console.log(t)
  return (
    <NavDropdown title={title} id="basic-nav-dropdown">
      {Object.keys(t.link).map((key) => (
       <Link key={key} href={t.link[key].link} className="dropdown-item">
        {t.link[key].name}
      </Link>
    ))}
    </NavDropdown>
  );
}

export default CommonDropDown;