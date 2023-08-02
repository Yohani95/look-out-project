import React from "react";
import Link from "next-intl/link";
import { NavDropdown } from "react-bootstrap";
function ContactDropDown({ t }) {
  return (
   <NavDropdown title={t.title} id="basic-nav-dropdown">
    <Link href="/contact/search" className="dropdown-item">
      {t.search}
    </Link>
    <Link href="/contact/ficha"  className="dropdown-item">
      {t.file}
    </Link>
    <Link href="/contact/create" className="dropdown-item">
      {t.create}
    </Link>
</NavDropdown>
  );
}

export default ContactDropDown;
