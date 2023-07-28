import Link from "next-intl/link";
import Nav from "./Nav";
import { useTranslations } from 'next-intl';
// _app.js (or _app.tsx)
const Header = () => {
  const t = useTranslations();
  const languages = {
    es: t("Languages.spanish"),
    en: t("Languages.english"),
    pt: t("Languages.portuguese"),
    namesMenu: {
      account: {
        title: t("Nav.account.title"),
        file: t("Nav.account.file"),
        create: t("Nav.account.create")
      },
      contacts: {
        title: t("Nav.contacts.title"),
        file: t("Nav.contacts.file"),
        create: t("Nav.contacts.create")
      },
      business: {
        insertProject: t("Nav.business.insertProject"),
        insertSuport: t("Nav.business.insertSuport"),
        insertServices: t("Nav.business.insertServices")
      }
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Nav t={languages} />
    </nav>
  );
};
export default Header;