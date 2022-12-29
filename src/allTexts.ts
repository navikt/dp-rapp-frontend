export type TextsType = {
  menuSend: string;
  menuHistory: string;
  menuAbout: string;
  menuFaq: string;

  title: string;
}

export type LocalesType = {
  nb: TextsType;
  en: TextsType;
}

const allTexts: LocalesType = {
  "nb": {
    "menuSend": "Send",
    "menuHistory": "Tidligere meldekort",
    "menuAbout": "Om meldekort",
    "menuFaq": "Ofte stilte spørsmål",
    "title": "Ny løsning"
  },
  "en": {
    "menuSend": "Send",
    "menuHistory": "Previous report cards",
    "menuAbout": "About",
    "menuFaq": "FAQ",
    "title": "New solution"
  }
};

export default allTexts;
