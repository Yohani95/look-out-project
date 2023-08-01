import { useState } from "react";
import Link from "next-intl/link";
import Image from "next/image";
import { NavDropdown } from "react-bootstrap";
import UK from "@/public/images/country/en.png";
import ES from "@/public/images/country/es.png";
import BR from "@/public/images/country/br.png";
import { usePathname } from "next/navigation";
const LanguageDropdown = ({ t }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const pathname = usePathname();
  let lastPathSegment = pathname;

  if (lastPathSegment.startsWith("/es/") || lastPathSegment.startsWith("/br/")) {
    lastPathSegment = lastPathSegment.slice(4);
  }
  // Si el último segmento es 'br' o 'es', redirige a la ruta raíz '/'
  if (lastPathSegment === "/br" || lastPathSegment === "/es") {
    lastPathSegment = "";
  }
  return (
    <NavDropdown title={t.languages.title} id="basic-nav-dropdown" >
      <NavDropdown.Item>
        <Link href={`/${lastPathSegment}`} locale="en" anchor className="dropdown-item">
          <Image src={UK} width={20} height={20} title={t.en} />
          <span style={{ marginLeft: "8px" }}>{t.en}</span>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link href={`/${lastPathSegment}`} locale="es" anchor className="dropdown-item">
          <Image src={ES} width={20} height={20} title={t.es} />
          <span style={{ marginLeft: "8px" }}>{t.es}</span>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link href={`/${lastPathSegment}`} locale="br" anchor className="dropdown-item">
          <Image src={BR} width={20} height={20} title={t.pt} />
          <span style={{ marginLeft: "8px" }}>{t.pt}</span>
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguageDropdown;
