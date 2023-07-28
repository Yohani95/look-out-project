'use client'
import Link from "next-intl/link";
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import UK from '@/public/images/country/en.png'
import ES from '@/public/images/country/es.png'
import BR from '@/public/images/country/br.png'
const Nav = ({t}) => {
  const pathname = usePathname()
  let lastPathSegment = pathname.split('/').pop();

  // Si el último segmento es 'br' o 'es', redirige a la ruta raíz '/'
  if (lastPathSegment === 'br' || lastPathSegment === 'es') {
    lastPathSegment = '';
  }
  return (
    <>      <div className="container-fluid justify-content-center">
      <Link className="navbar-brand" href={"/"}>KPAZ</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div clas="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link" href={"/ficha"}>{t.namesMenu.account.file}</Link>
          <Link className="nav-link" href={"/account"}>{t.namesMenu.account.create}</Link>
        </ul>
      </div>
    </div>
      <div className=" justify-content-end">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link" href={`/${lastPathSegment}`} locale="en"><Image src={UK} width={20} height={20} title={t.en} /></Link>
          <Link className="nav-link" href={`/${lastPathSegment}`} locale="es"><Image src={ES} width={20} height={20} title={t.es} /></Link>
          <Link className="nav-link" href={`/${lastPathSegment}`} locale="br"><Image src={BR} width={20} height={20} title={t.pt} /></Link>
        </ul>
      </div>
    </>
  );
};

export default Nav;