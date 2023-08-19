"use client";
import Link from "next-intl/link";
import Image from "next/image";
import LOGO from "@/public/images/logo.svg";
import BusinessDropDown from "../business/BusinessDropDown";
import LanguageDropdown from "./LanguageDropdown";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import ContactDropDown from "@/app/[locale]/components/contact/ContactDropDown";
import CommonDropDown from "@/app/[locale]/components/common/CommonDropDown";
import { useSession, signOut } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
const MyNav = ({ t }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar
        style={{ backgroundColor: "#2F4BCE" }}
        className="navbar-custom navbar-dark "
        expand="lg"
      >
        {" "}
        {/* Agrega las clases "navbar-dark bg-primary" */}
        <Container className="d-flex justify-content-center align-items-center">
          {" "}
          {/* Utilizamos el componente Container para centrar el contenido */}
          <Navbar.Brand>
            <Link href={"/"} className="navbar-brand">
              <Image src={LOGO} width={120} height={40} title="logo" alt="" />
            </Link>
          </Navbar.Brand>
          {session && (
            <>
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
                  <BusinessDropDown t={t.namesMenu.business} />
                  <CommonDropDown
                    t={t.namesMenu.project}
                    title={t.namesMenu.project.title}
                  />
                  <CommonDropDown
                    t={t.namesMenu.service}
                    title={t.namesMenu.service.title}
                  />
                  <CommonDropDown
                    t={t.namesMenu.facture}
                    title={t.namesMenu.facture.title}
                  />
                  <CommonDropDown
                    t={t.namesMenu.admin}
                    title={t.namesMenu.admin.title}
                  />
                  <LanguageDropdown t={t} />
                </Nav>
                <Nav>
                <NavDropdown
                  title={session.user.name}
                  id="basic-nav-dropdown"
                  className=""
                >
                  {/* <Link href="/account/ficha" className="dropdown-item">
                    {t.namesMenu.account.file}
                  </Link> */}
                  <button
                    className="btn btn-outline-primary btn-sm dropdown-item"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <FaArrowRightToBracket className="" />
                    <span style={{ marginLeft: "8px" }}>Exit</span>
                  </button>
                </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
