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
        search: `${t("Common.search")} ${t("Ficha.table.contacts.title")}`,
      },
      business: {
        title: t("Account.business"),
        search: `${t("Common.search")} ${t("Account.business")}`,
        insertProject: t("Nav.business.insertProject"),
        insertSupport: t("Nav.business.insertSupport"),
        insertServices: t("Nav.business.insertServices"),
      },
      project: {
        link: {
          addProject: {
            name: t("Nav.projects.addProject"),
            link: "/project/create",
          },
          addKickOff: {
            name: t("Nav.projects.addKickOff"),
            link: "/project/kickOff",
          },
          search: {
            name: t("Common.project"),
            link: "/project/search",
          },
        },
        title: t("Common.project"),
      },
      service: {
        link: {
          search: {
            name: t("Common.services"),
            link: "/service/search",
          },
          addProject: {
            name: t("Nav.services.addService"),
            link: "/service/create",
          },
          addKickOff: {
            name: t("Nav.services.addKickOff"),
            link: "/service/kickOff",
          },
          createNovelty: {
            name: t("Nav.services.createNovelty"),
            link: "/service/createNovelty",
          },
        },
        title: t("Common.services"),
      },
      facture:{
        link:{
          search: {
            name: t("Nav.facture.billing"),
            link: "/facture/search",
          },
          addProject: {
            name: t("Nav.facture.requestBilling"),
            link: "/facture/request",
          },
        },
        title:t("Nav.facture.bills")
      }
    },
  };

  return <Nav t={languages} />;
};
export default Header;
