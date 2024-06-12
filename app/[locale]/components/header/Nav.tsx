"use client";
import Link from "next-intl/link";
import Image from "next/image";
import LOGO from "@/public/images/logo.svg";
import LanguageDropdown from "./LanguageDropdown";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import CommonDropDown from "@/app/[locale]/components/common/CommonDropDown";
import { useSession, signOut } from "next-auth/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaUser, FaCog,FaBug } from "react-icons/fa";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { Usuario } from "@/app/api/models/admin/Usuario";
import { Constantes } from "@/app/api/models/common/Constantes";
const MyNav = ({ t, locale }) => {
  const { data: session, status } = useSession();
  const user=session?.user as any | null;
  let translations;
  const router = useRouter();
  translations = require(`@/messages/${locale}.json`);
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Redirigir a la página de inicio
    router.push("/");
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#2F4BCE" }}
        className="navbar-custom navbar-dark "
        expand="lg"
      >
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
                  <Nav.Item>
                    <Link className="nav-link" href={"/account/search"}>
                      {translations.Common.accounts}
                    </Link>
                  </Nav.Item>
                  <CommonDropDown
                    t={t.namesMenu.contacts}
                    title={t.namesMenu.contacts.title}
                  />
                  <Nav.Item>
                    <Link
                      className="nav-link"
                      href={"/business/closeServices/search"}
                    >
                      {translations.Ficha.business}
                    </Link>
                  </Nav.Item>
                  <CommonDropDown
                    t={t.namesMenu.supports}
                    title={t.namesMenu.supports.title}
                  />
                  {/* <CommonDropDown
                    t={t.namesMenu.service}
                    title={t.namesMenu.service.title}
                  /> */}
                  <CommonDropDown
                    t={t.namesMenu.oportunidad}
                    title={t.namesMenu.oportunidad.title}
                  />
                  {/* <CommonDropDown
                    t={t.namesMenu.service}
                    title={t.namesMenu.service.title}
                  /> */}
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
                    <Link
                      href={`/admin/user/edit/${user.id}`}
                      className="dropdown-item"
                    >
                      <FaCog className="text-secondary" />
                      <span style={{ marginLeft: "8px" }}>
                        {translations.Common.profile}
                      </span>
                    </Link>
                    {getLogComponent(user.rol.rolId)}
                    <button
                      className="btn btn-outline-primary btn-sm dropdown-item"
                      onClick={handleLogout}
                    >
                      <FaArrowRightToBracket className="text-secondary" />
                      <span style={{ marginLeft: "8px" }}>
                        {translations.Common.logout}
                      </span>
                    </button>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {status === "loading" && (
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
const getLogComponent=(idRol:number)=>{
  if(idRol==Constantes.Roles.ADMIN){
    return (
      <Link
      href={`/admin/logs/search`}
      className="dropdown-item"
    >
      <FaBug className="text-secondary" />
      <span style={{ marginLeft: "8px" }}>
        Logs
      </span>
    </Link>
    )
  }
}

export default MyNav;
