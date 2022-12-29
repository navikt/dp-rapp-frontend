export type TextsType = {
  menuSend: string;
  menuHistory: string;
  menuAbout: string;
  menuFaq: string;

  title: string;
}

export type LocalesType = {
  no: TextsType;
  en: TextsType;
}

const allTexts: LocalesType = {
  "no": {
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
