import "../../styles/globals.css";
import "@navikt/ds-css";

import type { AppProps } from "next/app";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'nb',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          "menuSend": "Send",
          "menuHistory": "Previous report cards",
          "menuAbout": "About",
          "menuFaq": "FAQ",
          "title": "New solution"
        }
      },
      nb: {
        translation: {
          "menuSend": "Send",
          "menuHistory": "Tidligere meldekort",
          "menuAbout": "Om meldekort",
          "menuFaq": "Ofte stilte spørsmål",
          "title": "Ny løsning"
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
