export default defineNuxtConfig({
  css: ['~/assets/styles.css'],
  modules: ['@nuxtjs/i18n'],
  app: {
    head: {
      title: '九酷游乐科技 | 娃娃机与无人娱乐设备',
      meta: [
        { name: 'description', content: '九酷游乐专注娃娃机、精品机、扭蛋机及无人娱乐设备研发制造，提供 SaaS、物联网与场景定制服务。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'zh-cn', language: 'zh-CN', name: '简体中文', alias: ['zh'] },
      { code: 'zh-tw', language: 'zh-TW', name: '繁體中文' },
      { code: 'en-us', language: 'en-US', name: 'English' }
    ],
    restructureDir: false,
    defaultLocale: 'zh-cn',
    vueI18n: './i18n.config.ts',
    strategy: 'prefix'
  },
  compatibilityDate: '2025-10-30'
})
