export default defineNuxtConfig({
  css: ['~/assets/styles.css'],
  // DPP is copied from public/ and served independently of localized Nuxt routes.
  nitro: { prerender: { ignore: ['/dpp'] } },
  modules: ['@nuxtjs/i18n'],
  app: {
    head: {
      title: '九酷游乐科技 | 游乐设备与软件开发',
      meta: [
        { name: 'description', content: '九酷游乐提供游乐设备、场地管理系统、SaaS、物联网、场景定制与软件外包开发服务。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  i18n: {
    baseUrl: 'https://jiukuclaw.com',
    locales: [
      { code: 'zh-cn', language: 'zh-CN', name: '简体中文', alias: ['zh'] },
      { code: 'zh-tw', language: 'zh-TW', name: '繁體中文' },
      { code: 'en-us', language: 'en-US', name: 'English' }
    ],
    restructureDir: false,
    defaultLocale: 'zh-cn',
    vueI18n: './i18n.config.ts',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'zh-cn'
    }
  },
  compatibilityDate: '2025-10-30'
})
