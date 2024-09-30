import Link from 'next/link';
import Image from 'next/image';
import { NavDropdown } from 'react-bootstrap';
import UK from '@/public/images/country/en.png';
import ES from '@/public/images/country/es.png';
import BR from '@/public/images/country/br.png';
import { usePathname } from 'next/navigation';
const LanguageDropdown = ({ t }) => {
  const pathname = usePathname();
  let lastPathSegment = pathname;

  if (
    lastPathSegment.startsWith('/es/') ||
    lastPathSegment.startsWith('/br/')
  ) {
    lastPathSegment = lastPathSegment.slice(4);
  }
  // Si el último segmento es 'br' o 'es', redirige a la ruta raíz '/'
  if (lastPathSegment === '/br' || lastPathSegment === '/es') {
    lastPathSegment = '';
  }
  return (
    <NavDropdown title={t.languages.title} id="basic-nav-dropdown">
      <Link href={`/${lastPathSegment}`} locale="en" className="dropdown-item">
        <Image src={UK} width={20} height={20} title={t.en} alt="" />
        <span style={{ marginLeft: '8px' }}>{t.en}</span>
      </Link>
      <Link href={`/${lastPathSegment}`} locale="es" className="dropdown-item">
        <Image src={ES} width={20} height={20} title={t.es} alt="" />
        <span style={{ marginLeft: '8px' }}>{t.es}</span>
      </Link>
      <Link href={`/${lastPathSegment}`} locale="br" className="dropdown-item">
        <Image src={BR} width={20} height={20} title={t.pt} alt="" />
        <span style={{ marginLeft: '8px' }}>{t.pt}</span>
      </Link>
    </NavDropdown>
  );
};

export default LanguageDropdown;
