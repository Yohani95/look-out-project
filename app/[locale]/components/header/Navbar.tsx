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
import { User } from 'lucide-react'; // Ícono por defecto si no hay avatar
import LOGO from '@/public/images/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user as any | null;
  const locale = useLocale();
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-3"
      style={{ backgroundColor: '#2F4BCE' }}
    >
      {/* Logo */}
      <Link href="/" className="navbar-brand">
        <Image src={LOGO} width={120} height={40} title="logo" alt="Logo" />
      </Link>
      {status === 'authenticated' && (
        <>
          {/* Main Menu */}
          <div className="flex space-x-6 text-white tex-right">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none hover:underline">
                  Gestión
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
                <DropdownMenuItem>
                  <Link href="/admin/user/list">Usuarios</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/gestion/roles">Roles</Link>
                </DropdownMenuItem>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none hover:underline">
                  Comercial
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
                <DropdownMenuItem>
                  <Link href="/prospect/search">{t.Common.prospect}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact/search">
                    {t.Ficha.table.contacts.title}
                  </Link>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none hover:underline">
                  Servicios
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
                <DropdownMenuItem>
                  <Link href="/developmentProject/search">
                    {t.Common.project}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact/search">
                    {t.Ficha.table.contacts.title}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/business/Support/search">
                    {t.support.contractSupport}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none hover:underline">
                  Finanzas
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
                <DropdownMenuItem>
                  <Link href="/facture/search">{t.Nav.facture.billing}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/reportes" className="hover:underline">
              Reportes
            </Link>
          </div>
          {/* User and Language */}
          <div className="flex items-center space-x-4">
            {/* User Session */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white focus:outline-none flex items-center">
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
                  <button onClick={handleLogout} className="w-full text-left">
                    {t.Common.logout}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Dropdown */}
            <LanguageDropdown t={t} />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
