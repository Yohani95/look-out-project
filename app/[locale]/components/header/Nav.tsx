'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Menu, X, LogOut } from 'lucide-react';
import LOGO from '@/public/images/logo.svg';
import LanguageDropdown from './LanguageDropdown';
import { Constantes } from '@/app/api/models/common/Constantes';
import { useLocale } from 'next-intl';

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user as any | null;
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const getLogComponent = (idRol: number) => {
    if (idRol === Constantes.Roles.ADMIN) {
      return <Link href="/admin/logs/search">Logs</Link>;
    }
  };

  return (
    <nav className="bg-[#2F4BCE] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={LOGO} width={120} height={40} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          <DropdownMenu
            title="Gestión"
            links={[
              { href: '/admin/user/list', label: 'Usuarios' },
              { href: '/gestion/roles', label: 'Roles' },
              { href: '/admin/perfil/search', label: 'Perfil' },
            ]}
          />
          <DropdownMenu
            title="Comercial"
            links={[
              { href: '/prospect/search', label: 'Prospectos' },
              { href: '/contact/search', label: 'Contactos' },
              { href: '/account/search', label: 'Cuentas' },
            ]}
          />
          <DropdownMenu
            title="Servicios"
            links={[
              { href: '/developmentProject/search', label: 'Proyectos' },
              { href: '/business/Support/search', label: 'Soporte' },
            ]}
          />
          <Link href="/reportes" className="hover:text-gray-300">
            Reportes
          </Link>
          {user && (
            <DropdownMenu
              title={user.name}
              icon={<User className="w-6 h-6" />}
              links={[
                { href: `/admin/user/edit/${user.id}`, label: 'Perfil' },
                {
                  onClick: handleLogout,
                  label: 'Cerrar sesión',
                },
                { element: getLogComponent(user.rol?.rolId) },
              ]}
            />
          )}
          <LanguageDropdown t={t} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#2F4BCE] text-white space-y-4 px-4 py-3">
          <Link href="/" className="block hover:text-gray-300">
            Inicio
          </Link>
          <DropdownMenu
            title="Gestión"
            links={[
              { href: '/admin/user/list', label: 'Usuarios' },
              { href: '/gestion/roles', label: 'Roles' },
              { href: '/admin/perfil/search', label: 'Perfil' },
            ]}
          />
          <DropdownMenu
            title="Comercial"
            links={[
              { href: '/prospect/search', label: 'Prospectos' },
              { href: '/contact/search', label: 'Contactos' },
              { href: '/account/search', label: 'Cuentas' },
            ]}
          />
          <DropdownMenu
            title="Servicios"
            links={[
              { href: '/developmentProject/search', label: 'Proyectos' },
              { href: '/business/Support/search', label: 'Soporte' },
            ]}
          />
          <Link href="/reportes" className="block hover:text-gray-300">
            Reportes
          </Link>
          {user && (
            <DropdownMenu
              title={user.name}
              icon={<User className="w-6 h-6" />}
              links={[
                { href: `/admin/user/edit/${user.id}`, label: 'Perfil' },
                {
                  onClick: handleLogout,
                  label: 'Cerrar sesión',
                },
                { element: getLogComponent(user.rol?.rolId) },
              ]}
            />
          )}
          <LanguageDropdown t={t} />
        </div>
      )}
    </nav>
  );
};

const DropdownMenu = ({
  title,
  links,
  icon,
}: {
  title: string;
  links: any[];
  icon?: React.ReactNode;
}) => (
  <div className="group relative">
    <button className="flex items-center hover:text-gray-300">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </button>
    <div className="absolute left-0 hidden group-hover:block bg-white text-gray-700 shadow-lg rounded-md mt-2">
      {links.map((link, idx) =>
        link.href ? (
          <Link
            key={idx}
            href={link.href}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ) : link.onClick ? (
          <button
            key={idx}
            onClick={link.onClick}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label}
          </button>
        ) : (
          <span key={idx} className="block px-4 py-2">
            {link.element}
          </span>
        )
      )}
    </div>
  </div>
);

export default Navbar;
