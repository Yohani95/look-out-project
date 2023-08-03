import React from "react";
import Link from "next-intl/link";
import { NavDropdown } from "react-bootstrap";
function BusinessDropDown({ t }) {
  return (
   <NavDropdown title={t.title} id="basic-nav-dropdown">
    <Link href="/business/search" className="dropdown-item">
      {t.search}
    </Link>
    <Link href="/business/closeProject" className="dropdown-item">
      {t.insertProject}
    </Link>
    <Link href="/business/closeSupport"  className="dropdown-item">
      {t.insertSuport}
    </Link>
    <Link href="/business/closeServices" className="dropdown-item">
      {t.insertServices}
    </Link>
</NavDropdown>
  );
}

export default BusinessDropDown;
