'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import LOGO from '@/public/images/logo.svg';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import LanguageDropdown from './LanguageDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Constantes } from '@/app/api/models/common/Constantes';
const funcionalidadesMap = {
  1: { label: 'Usuarios', path: '/admin/user/list', category: 'Gestión' },
  2: { label: 'Perfil', path: '/admin/perfil/search', category: 'Gestión' },
  3: {
    label: 'Profesionales',
    path: '/admin/professional/search',
    category: 'Gestión',
  },
  4: { label: 'Prospecto', path: '/prospect/search', category: 'Comercial' },
  5: {
    label: 'Contacto Prospecto',
    path: '/prospect/contact/search',
    category: 'Comercial',
  },
  6: { label: 'Contactos', path: '/contact/search', category: 'Comercial' },
  7: { label: 'Cuentas', path: '/account/search', category: 'Comercial' },
  8: {
    label: 'Oportunidades',
    path: '/opportunities/search',
    category: 'Comercial',
  },
  9: {
    label: 'Cierre Negocio',
    path: '/business/closeServices/search',
    category: 'Comercial',
  },
  10: {
    label: 'Proyecto',
    path: '/developmentProject/search',
    category: 'Servicios',
  },
  11: {
    label: 'Soporte',
    path: '/business/Support/search',
    category: 'Servicios',
  },
  12: { label: 'Factura', path: '/facture/search', category: 'Finanzas' },
  13: { label: 'Roles', path: '/admin/rol/search', category: 'Gestión' },
  14: { label: 'Licencias', path: '/licenses/search', category: 'Servicios' },
};

const Navbar = () => {
  const { data: session } = useSession();
  const user = (session?.user as any) || null;
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const getMenuByCategory = (category: string) => {
    if (!user?.rol?.funcionalidades) return null;

    const items = user.rol.funcionalidades
      .filter((f) => f.tieneAcceso)
      .filter(
        (f) => funcionalidadesMap[f.funcionalidadId]?.category === category
      )
      .map((f) => {
        const func = funcionalidadesMap[f.funcionalidadId];
        return (
          <DropdownMenuItem
            key={f.funcionalidadId}
            onSelect={() => {
              router.push(func.path); // Navega a la página
            }} // Navega a la página correspondiente
            className="cursor-pointer menu-item"
          >
            {func.label}
          </DropdownMenuItem>
        );
      });

    return items.length > 0 ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:text-gray-300 focus:outline-none focus:ring-0 active:bg-transparent">
            {category}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white text-gray-700 shadow-md rounded-md border border-gray-200"
          sideOffset={5} // Desplazamiento visual del menú
        >
          {items}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;
  };

  return (
    <nav className="bg-[#2F4BCE] text-white shadow-md">
      <div className="container mx-auto px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={LOGO} width={120} height={40} alt="Logo" />
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
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center ml-auto mr-12 space-x-8">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          {getMenuByCategory('Gestión') && getMenuByCategory('Gestión')}
          {getMenuByCategory('Comercial') && getMenuByCategory('Comercial')}
          {getMenuByCategory('Servicios') && getMenuByCategory('Servicios')}
          {getMenuByCategory('Finanzas') && getMenuByCategory('Finanzas')}
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
          <LanguageDropdown t={t} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2F4BCE] text-white px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-gray-300">
            Inicio
          </Link>
          {getMenuByCategory('Gestión') && (
            <>
              <br />
              {getMenuByCategory('Gestión')}
            </>
          )}
          {getMenuByCategory('Comercial') && (
            <>
              <br />
              {getMenuByCategory('Comercial')}
            </>
          )}
          {getMenuByCategory('Servicios') && (
            <>
              <br />
              {getMenuByCategory('Servicios')}
            </>
          )}
          {getMenuByCategory('Finanzas') && (
            <>
              <br />
              {getMenuByCategory('Finanzas')}
            </>
          )}
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
export default Navbar;
