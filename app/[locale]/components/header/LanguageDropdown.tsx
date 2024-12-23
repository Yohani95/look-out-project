'use client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import UK from '@/public/images/country/en.png';
import ES from '@/public/images/country/es.png';
import BR from '@/public/images/country/br.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const LanguageDropdown = ({ t }) => {
  const pathname = usePathname();
  let lastPathSegment = pathname;
  const locale = useLocale(); // Obtener el idioma actual
  if (
    lastPathSegment.startsWith('/es/') ||
    lastPathSegment.startsWith('/br/')
  ) {
    lastPathSegment = lastPathSegment.slice(4);
  }

  if (lastPathSegment === '/br' || lastPathSegment === '/es') {
    lastPathSegment = '';
  }
  // Seleccionar imagen según el idioma actual
  const currentLanguageImage =
    locale === 'en' ? UK : locale === 'es' ? ES : locale === 'br' ? BR : ES; // Idioma predeterminado
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-white focus:outline-none">
          <Image
            src={currentLanguageImage} // Cambia esto según el idioma activo
            width={24}
            height={24}
            alt={t.Common.language}
            className="rounded-full mr-2"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-200 p-2">
        <DropdownMenuItem>
          <Link href={`/en`} locale="en">
            <div className="flex items-center">
              <Image src={UK} width={20} height={20} alt={t.en} />
              <span className="ml-2">{t.Languages.english}</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/es`} locale="es">
            <div className="flex items-center">
              <Image src={ES} width={20} height={20} alt={t.es} />
              <span className="ml-2">{t.Languages.spanish}</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/br`} locale="br">
            <div className="flex items-center">
              <Image src={BR} width={20} height={20} alt={t.pt} />
              <span className="ml-2">{t.Languages.portuguese}</span>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
