



import { createI18n, useI18n } from 'vue-i18n'
import enUs from "@/locales/en-US.json"
import trTR from "@/locales/tr-TR.json"
import { useStorage } from "@vueuse/core";


const defaultLanguage = "en-US";
export const languages = ["en-US", "tr-TR"];
//browser language 
const language = useStorage("language", defaultLanguage);

//default language
const i18n = createI18n({
  locale: language.value,
  legacy: false,
  globalInjection: true,
  fallbackLocale: "en-US",
  messages: {
    "en-US": enUs,
    "tr-TR":trTR
  }
})
export const { t } = i18n.global;
export default i18n;


