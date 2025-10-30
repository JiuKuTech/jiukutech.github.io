export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { 
        code: 'zh-cn', 
        iso: 'zh-CN', 
        name: '简体中文',
        alias: ['zh']
      },
      { code: 'zh-tw', iso: 'zh-TW', name: '繁體中文' },
      { code: 'en-us', iso: 'en-US', name: 'English' }
    ],
    restructureDir: false,
    defaultLocale: 'zh-cn',
    vueI18n: './i18n.config.ts',
    strategy: 'prefix',
    compatibilityDate: '2025-10-30'
  }
})

