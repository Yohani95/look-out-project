'use client';
import { signOut, useSession } from 'next-auth/react';
import LanguageDropdown from './LanguageDropdown';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Bug, User } from 'lucide-react'; // Ícono por defecto si no hay avatar
import LOGO from '@/public/images/logo.svg';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Constantes } from '@/app/api/models/common/Constantes';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user as any | null;
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#2F4BCE] text-white shadow-md">
      <div className="container mx-auto px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={LOGO} width={120} height={40} title="logo" alt="Logo" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center ml-auto mr-12 space-x-8">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          {/* gestion */}
          {getComponentGestion(user.rol?.rolId, t)}
          {/* delevery */}
          {getComponentDelevery(user.rol?.rolId, t)}
          {/* Comercial */}
          {getComponentComercial(user.rol?.rolId, t)}
          {/* servicios */}
          {getComponentJefeProyectos(user.rol?.rolId, t)}
          {/* finanzas */}
          {getComponentFinanzas(user.rol?.rolId, t)}
          <br />
        </div>

        {/* User and Language */}
        <div className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white flex items-center">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <User className="w-8 h-8 mr-2 text-white" />
                )}
                {user?.name}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
              <DropdownMenuItem>
                <Link href={`/admin/user/edit/${user?.id}`}>
                  {t.Common.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {getLogComponent(user.rol?.rolId)}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} className="w-full text-left">
                  {t.Common.logout}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Dropdown */}
          <LanguageDropdown t={t} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2F4BCE] text-white px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-gray-300">
            Inicio
          </Link>
          {/* gestion */}
          {getComponentGestion(user.rol?.rolId, t)}
          {/* delevery */}
          {getComponentDelevery(user.rol?.rolId, t)}
          {/* Comercial */}
          {getComponentComercial(user.rol?.rolId, t)}
          {/* servicios */}
          {getComponentJefeProyectos(user.rol?.rolId, t)}
          {/* finanzas */}
          {getComponentFinanzas(user.rol?.rolId, t)}
          <br />
          {/* Repite las demás secciones similares para "Comercial", "Servicios", etc. */}
          {/* User and Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white flex items-center">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <User className="w-8 h-8 mr-2 text-white" />
                )}
                {user?.name}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
              <DropdownMenuItem>
                <Link href={`/admin/user/edit/${user?.id}`}>
                  {t.Common.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {getLogComponent(user.rol?.rolId)}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} className="w-full text-left">
                  {t.Common.logout}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Language Dropdown */}
          <LanguageDropdown t={t} />
        </div>
      )}
    </nav>
  );
};

const getLogComponent = (idRol: number) => {
  if (idRol == Constantes.Roles.ADMIN) {
    return <Link href="/admin/logs/search">Logs</Link>;
  }
};
const getComponentComercial = (idRol: number, t) => {
  if (
    idRol == Constantes.Roles.COMERCIAL ||
    idRol == Constantes.Roles.CONSULTORIA ||
    idRol == Constantes.Roles.ADMIN
  ) {
    return (
      <>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Comercial</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-gray-700 shadow-md rounded-md border border-gray-200">
            {idRol != Constantes.Roles.CONSULTORIA ? (
              <>
                <DropdownMenuItem>
                  <Link href="/prospect/search">{t.Common.prospect}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/prospect/contact/search">
                    {t.Common.prospectContact}
                  </Link>
                </DropdownMenuItem>
              </>
            ) : null}

            <DropdownMenuItem>
              <Link href="/contact/search">{t.Ficha.table.contacts.title}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/account/search">{t.Common.accounts}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/opportunities/search">
                {t.Opportunity.opportunities}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/business/closeServices/search">
                {t.Nav.business.insertServices}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
};
const getComponentFinanzas = (idRol: number, t) => {
  if (idRol == Constantes.Roles.FINANZAS || idRol == Constantes.Roles.ADMIN) {
    return (
      <>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Finanzas</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
            <DropdownMenuItem>
              <Link href="/facture/search">{t.Nav.facture.billing}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
};
const getComponentJefeProyectos = (idRol: number, t) => {
  if (
    idRol == Constantes.Roles.JEFE_DE_PROYECTOS ||
    idRol == Constantes.Roles.ADMIN
  ) {
    return (
      <>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Servicios</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
            <DropdownMenuItem>
              <Link href="/developmentProject/search">{t.Common.project}</Link>
            </DropdownMenuItem>
            {idRol == Constantes.Roles.ADMIN ? (
              <DropdownMenuItem>
                <Link href="/business/Support/search">{t.Common.supports}</Link>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
};
//no incluye logica de admin delevery
const getComponentDelevery = (idRol: number, t) => {
  if (idRol == Constantes.Roles.DELEVERY) {
    return (
      <>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Comercial</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-gray-700 shadow-md rounded-md border border-gray-200">
            <DropdownMenuItem>
              <Link href="/contact/search">{t.Ficha.table.contacts.title}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/account/search">{t.Common.accounts}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/opportunities/search">
                {t.Opportunity.opportunities}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Servicios</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
            <DropdownMenuItem>
              <Link href="/developmentProject/search">{t.Common.project}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/contact/search">{t.Ficha.table.contacts.title}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/business/Support/search">
                {t.support.contractSupport}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
};
const getComponentGestion = (idRol: number, t) => {
  if (
    idRol == Constantes.Roles.JEFE_DE_PROYECTOS ||
    idRol == Constantes.Roles.CONSULTORIA ||
    idRol == Constantes.Roles.ADMIN
  ) {
    return (
      <>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300">Gestión</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-gray-700 shadow-md rounded-md border border-gray-200">
            {idRol == Constantes.Roles.ADMIN ? (
              <DropdownMenuItem>
                <Link href="/admin/user/list">
                  {t.Nav.administration.userList}
                </Link>
              </DropdownMenuItem>
            ) : (
              ''
            )}
            <DropdownMenuItem>
              <Link href="/admin/perfil/search">{t.Common.profile}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/professional/search">
                {t.Common.professionals}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
};

export default Navbar;
