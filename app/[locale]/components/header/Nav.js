"use client";
import Link from "next-intl/link";
import Image from "next/image";
import LOGO from "@/public/images/logo.svg";
import LanguageDropdown from "./LanguageDropdown";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import CommonDropDown from "@/app/[locale]/components/common/CommonDropDown";
import { useSession, signOut } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaUser,FaCog } from "react-icons/fa";
const MyNav = ({ t,locale }) => {
  const { data: session, status } = useSession();
  let translations;
  translations = require(`@/messages/${locale}.json`);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
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
                  <CommonDropDown
                    t={t.namesMenu.account}
                    title={t.namesMenu.account.title}
                  />
                  <CommonDropDown
                    t={t.namesMenu.contacts}
                    title={t.namesMenu.contacts.title}
                  />
                  <CommonDropDown
                    t={t.namesMenu.business}
                    title={t.namesMenu.business.title}
                  />
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
                    title={
                      <>
                        <FaUser
                          style={{ marginRight: "8px", fontSize: "20px" }}
                        />
                        {session.user.name}
                      </>
                    }
                    id=""
                    className=""
                  >
                    <Link href={`/admin/user/edit/${session.user.id}`} className="dropdown-item">
                    <FaCog className="text-secondary" />
                    <span style={{ marginLeft: "8px" }}>{translations.Common.profile}</span>
                    </Link>
                    <button
                      className="btn btn-outline-primary btn-sm dropdown-item"
                      onClick={handleLogout}
                    >
                      <FaArrowRightToBracket className="text-secondary"  />
                      <span style={{ marginLeft: "8px" }}>{translations.Common.logout}</span>
                    </button>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {status === "loading" &&  (
            <>
              <Navbar.Toggle aria-controls="navbarSupportedContent" />
              <Navbar.Collapse id="navbarSupportedContent">
                {/* <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span>
                <span class="placeholder col-1 m-1"></span> */}
                {/* Esqueleto o indicador de carga */}
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
