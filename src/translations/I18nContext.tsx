import { useContext } from "react";
import I18n from "i18n-js";

import en from "./en.json";
import fr from "./fr.json";

I18n.fallbacks = true;

// todo: It is not available until LanguageContext is set on Setting Page.
// const languageContext = useContext(LanguageContext);
// I18n.locale = languageContext;

//Availale languages
I18n.translations = {
  en: en,
  fr: fr
};

function getString(key) {
  return I18n.t(key);
}

export default {
  getString
};
