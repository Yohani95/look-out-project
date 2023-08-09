"use client";
import Link from "next-intl/link";
import { useState } from "react";
import Image from "next/image";
import LOGO from "@/public/images/logo.png";
import BusinessDropDown from "../business/BusinessDropDown";
import LanguageDropdown from "./LanguageDropdown";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import ContactDropDown from "@/app/[locale]/components/contact/ContactDropDown";
import CommonDropDown from "@/app/[locale]/components/common/CommonDropDown"
const MyNav = ({ t }) => {
  return (
    <>
      <Navbar style={{ backgroundColor: "#2F4BCE" }} className="navbar-custom navbar-dark " expand="lg">
        {" "}
        {/* Agrega las clases "navbar-dark bg-primary" */}
        <Container className="d-flex justify-content-center align-items-center">
          {" "}
          {/* Utilizamos el componente Container para centrar el contenido */}
          <Navbar.Brand>
            <Link href={"/"} className="navbar-brand">
            <Image src={LOGO} width={80} height={40} title="logo" alt=""/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              {/* Dropdown Component */}
              <NavDropdown
                title={t.namesMenu.account.title}
                id="basic-nav-dropdown"
              >
                <Link href="/account/ficha" className="dropdown-item">
                  {t.namesMenu.account.file}
                </Link>
                <Link href="/account/create" className="dropdown-item">
                  {t.namesMenu.account.create}
                </Link>
                <Link href="/account/relations" className="dropdown-item">
                  {t.namesMenu.account.accountRelationship}
                </Link>
                <Link href="/account/search" className="dropdown-item">
                  {t.namesMenu.account.findAccount}
                </Link>
              </NavDropdown>
              <ContactDropDown t={t.namesMenu.contacts} />
              <BusinessDropDown t={t.namesMenu.business}/>
              <CommonDropDown  t={t.namesMenu.project} title={t.namesMenu.project.title}/> 
              <LanguageDropdown t={t} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
