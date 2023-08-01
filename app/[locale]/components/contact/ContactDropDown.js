import React from "react";
import Link from "next-intl/link";
import { NavDropdown } from "react-bootstrap";
function ContactDropDown({ t }) {
  return (
    <NavDropdown title={t.title} id="basic-nav-dropdown">
      <NavDropdown.Item>
        <Link
          href="/contact/search"
          locale="en"
          className="dropdown-item"
          anchor
        >
          <span style={{ marginLeft: "8px" }}>{t.title}</span>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link
          href="/contact/ficha"
          locale="en"
          className="dropdown-item"
          anchor
        >
          <span style={{ marginLeft: "8px" }}>{t.file}</span>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link
          href="/contact/create"
          locale="en"
          className="dropdown-item"
          anchor
        >
          <span style={{ marginLeft: "8px" }}>{t.create}</span>
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default ContactDropDown;
