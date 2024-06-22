import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { Quasar } from 'quasar'
import { axiosInstance } from 'boot/axios.js'

const defaultLocale = Quasar.lang.isoName

Vue.use(VueI18n)
const i18nInstance = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages
})

export default async ({ app }) => {
  app.i18n = i18nInstance
}

export { i18nInstance }

export const setLocale = locale => {
  i18nInstance.locale = locale.isoCode
  axiosInstance.defaults.headers.common['Accept-Language'] = locale.isoCode
  Vue.prototype.$userLang = locale.lang
  localStorage.lang = locale.lang
  console.log("--------I am locale iscode-----------")
  console.log(locale.isoCode)
  let quasarLang = locale.isoCode.replace('_', '-').toLowerCase()
  import(`quasar/lang/${quasarLang}`).then(lang => {
    Quasar.lang.set(lang.default)
  })
}
