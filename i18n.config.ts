import zh_cn_header from './locales/zh-cn/header.json'
import zh_tw_header from './locales/zh-tw/header.json'
import en_us_header from './locales/en-us/header.json'

import zh_cn_footer from './locales/zh-cn/footer.json'  
import zh_tw_footer from './locales/zh-tw/footer.json'
import en_us_footer from './locales/en-us/footer.json'

import zh_cn_about from './locales/zh-cn/about.json'
import zh_tw_about from './locales/zh-tw/about.json'
import en_us_about from './locales/en-us/about.json'

import zh_cn_contact from './locales/zh-cn/contact.json'
import zh_tw_contact from './locales/zh-tw/contact.json'
import en_us_contact from './locales/en-us/contact.json'

import zh_cn_csr from './locales/zh-cn/csr.json'
import zh_tw_csr from './locales/zh-tw/csr.json'
import en_us_csr from './locales/en-us/csr.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    'zh-cn': {...zh_cn_header, ...zh_cn_footer, ...zh_cn_about, ...zh_cn_contact, ...zh_cn_csr},
    'zh-tw': {...zh_tw_header, ...zh_tw_footer, ...zh_tw_about, ...zh_tw_contact, ...zh_tw_csr},
    'en-us': {...en_us_header, ...en_us_footer, ...en_us_about, ...en_us_contact, ...en_us_csr},
  },
  fallbackWarn: false,
  missingWarn: false
}))