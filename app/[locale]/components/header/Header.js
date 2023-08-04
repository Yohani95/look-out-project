import Nav from "./Nav";
import { useTranslations } from "next-intl";
const Header = () => {
  const t = useTranslations();
  const languages = {
    languages: {
      title: t("Languages.title"),
    },
    es: t("Languages.spanish"),
    en: t("Languages.english"),
    pt: t("Languages.portuguese"),

    namesMenu: {
      account: {
        title: t("Nav.account.title"),
        file: t("Nav.account.file"),
        create: t("Nav.account.create"),
        accountRelationship: t("Nav.account.accountRelationship"),
        findAccount: t("Account.findAccount"),
      },
      contacts: {
        title: t("Nav.contacts.title"),
        file: t("Nav.contacts.file"),
        create: t("Nav.contacts.create"),
        search:`${t('Common.search')} ${t('Ficha.table.contacts.title')}`
      },
      business: {
        title: t('Account.business'),
        search: `${t('Common.search')} ${t('Account.business')}`,
        insertProject: t("Nav.business.insertProject"),
        insertSupport: t("Nav.business.insertSupport"),
        insertServices: t("Nav.business.insertServices"),
      },
    },
  };

  return <Nav t={languages} />;
};
export default Header;
