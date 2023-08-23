import Nav from "./Nav";
import { useTranslations,useLocale } from "next-intl";
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
        link: {
          file: {
            name: t("Ficha.title"),
            link: "/account/ficha",
          },
          create: {
            name: t("Nav.account.create"),
            link: "/account/create",
          },
          relation: {
            name: t("Nav.account.accountRelationship"),
            link: "/account/relations",
          },
          search: {
            name: t("Account.findAccount"),
            link: "/account/search",
          },
        },
        title:t("Nav.account.title"),
      },
      contacts: {
        title: t("Nav.contacts.title"),
        link: {
          file: {
            name: t("Nav.contacts.file"),
            link: "/contact/ficha",
          },
          create: {
            name: t("Nav.contacts.create"),
            link: "/contact/create",
          },
          search: {
            name: `${t("Common.search")} ${t("Ficha.table.contacts.title")}`,
            link: "/contact/search",
          },
        },
      },
      business: {
        title: t("Account.business"),
        link: {
          insertProject: {
            name: t("Nav.business.insertProject"),
            link: "/business/closeProject",
          },
          insertSupport: {
            name: t("Nav.business.insertSupport"),
            link: "/business/closeSupport",
          },
          insertServices: {
            name: t("Nav.business.insertServices"),
            link: "/account/relations",
          },
          search: {
            name: `${t("Common.search")} ${t("Account.business")}`,
            link: "/business/closeServices",
          },
        },
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
      },
      admin:{
        link:{
          create:{
            name: t("Nav.administration.createUser"),
            link: "/admin/user/create",
          },
          list:{
            name: t("Nav.administration.user"),
            link: "/admin/user/list",
          }
        },
        title:t("Nav.administration.title")
      }
    },
  };

  return <Nav t={languages} locale={useLocale()} />;
};
export default Header;
