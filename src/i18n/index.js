import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW'
import ja from './locales/ja'

const getBrowserLocale = () => {
  const navigatorLocale = navigator.languages?.[0] || navigator.language
  if (!navigatorLocale) return 'zh-TW'

  const locale = navigatorLocale.toLowerCase()
  if (locale === 'zh-tw') return 'zh-TW'
  if (locale === 'ja') return 'ja'

  const baseLang = locale.split('-')[0]
  return baseLang === 'ja' ? 'ja' : 'zh-TW'
}

const getInitialLocale = () => {
  return localStorage.getItem('preferred-language') || getBrowserLocale()
}

export default createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'zh-TW',
  messages: { 'zh-TW': zhTW, 'ja': ja },
  globalInjection: true,
})
