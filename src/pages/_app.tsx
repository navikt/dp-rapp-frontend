import "../styles/globals.css";
import "@navikt/ds-css";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import type { AppProps } from "next/app";


// Await init?
i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'nb',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      nb: {
        translation: {
          "menuSend": "Send",
          "menuHistory": "Tidligere meldekort",
          "menuAbout": "Om meldekort",
          "menuFaq": "Ofte stilte spørsmål",

          "indexTitle": "Ny løsning",
          "indexDescription": "Du kan sende inn meldekort for følgende perioder:",

          "historyTitle": "Tidligere meldekort",

          "aboutTitle": "Om meldekort",

          "faqTitle": "Ofte stilte spørsmål",

          "period": "Periode",
          "date": "Dato",
          "week": "Uke",
          "deadline": "Frist",
          "startFillingOut": "Begynn utfylling"
        }
      },
      en: {
        translation: {
          "menuSend": "Send",
          "menuHistory": "Previous report cards",
          "menuAbout": "About",
          "menuFaq": "FAQ",

          "indexTitle": "New solution",
          "indexDescription": "You can submit registration cards for the following periods:",

          "historyTitle": "Previous report cards",

          "aboutTitle": "About report cards",

          "faqTitle": "FAQ",

          "period": "Period",
          "date": "Date",
          "week": "Week",
          "deadline": "Deadline",
          "startFillingOut": "Start filling out"
        }
      }
    }
  });

onLanguageSelect((language) => {
  i18n.changeLanguage(language.locale);
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
