import Nav from "./Nav";
import { useTranslations, useLocale } from "next-intl";
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
          search: {
            name: t("Common.accounts"),
            link: "/account/search",
          },
        },
        title: t("Nav.account.title"),
      },
      contacts: {
        title: t("Nav.contacts.title"),
        link: {
          search: {
            name: ` ${t("Ficha.table.contacts.title")}`,
            link: "/contact/search",
          },
          email: {
            name: `${t("Common.email")} `,
            link: "/admin/email/search",
          },
          phone: {
            name: `${t("Common.phone")}`,
            link: "/admin/phone/search",
          },
          // addres: {
          //   name: `${t("Common.address")}`,
          //   link: "/contact/address/search",
          // },
        },
      },
      business: {
        title: t("Account.business"),
        link: {
          // insertProject: {
          //   name: t("Nav.business.insertProject"),
          //   link: "/business/closeProject",
          // },
          insertServices: {
            name: t("Nav.business.insertServices"),
            link: "/business/closeServices/search",
          },
          // insertSupport: {
          //   name: t("Nav.business.insertSupport"),
          //   link: "/business/closeSupport",
          // },
          // search: {
          //   name: `${t("Common.search")} ${t("Account.business")}`,
          //   link: "/",
          // },
        },
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
      facture: {
        link: {
          search: {
            name: t("Nav.facture.billing"),
            link: "/facture/search",
          },
          // addProject: {
          //   name: t("Nav.facture.requestBilling"),
          //   link: "/facture/request",
          // },
        },
        title: t("Nav.facture.bills"),
      },
      admin: {
        link: {
          create: {
            name: t("Nav.administration.createUser"),
            link: "/admin/user/create",
          },
          list: {
            name: t("Nav.administration.user"),
            link: "/admin/user/list",
          },
          profile: {
            name: t("Common.profile"),
            link: "/admin/perfil/search",
          },
          employe:{
            name:t("Common.professionals"),
            link: "/admin/professional/search"
          }
        },
        title: t("Nav.administration.title"),
      },
      supports:{
        link: {
          search: {
            name: t("Common.supports"),
            link: "/business/Support/search",
          },
          bag: {
            name: t("support.contractSupport"),
            link: "/business/Support/contract/create",
          },
          contract: {
            name: t("support.bagholder"),
            link: "/business/Support/bag/create",
          },
          onDemand:{
            name:t("support.onDemandSupport"),
            link: "/business/Support/onDemand/create"
          }
        },
        title: t("Common.supports"),
      }
    },
  };
  console.log(languages)
  return <Nav t={languages} locale={useLocale()} />;
};
export default Header;
