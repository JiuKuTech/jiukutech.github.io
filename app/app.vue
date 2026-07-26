<template>
  <div class="app-shell">
    <Header />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const localeHead = useLocaleHead()
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Guangzhou JiuKu Amusement Technology Co., Ltd.',
  alternateName: '九酷游乐',
  url: 'https://jiukuclaw.com',
  email: '82096004@qq.com',
  telephone: '+86-137-1044-1030',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-137-1044-1030',
    contactType: 'sales',
    url: 'https://wa.me/8613710441030',
    availableLanguage: ['zh-CN', 'zh-TW', 'en']
  },
  foundingDate: '2014',
  address: [
    {
      '@type': 'PostalAddress',
      name: 'Company office',
      streetAddress: 'Room 102, Building A, Huoli Animation Technology Park',
      addressLocality: 'Panyu District, Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN'
    },
    {
      '@type': 'PostalAddress',
      name: 'Factory',
      streetAddress: 'Room 421, Building B, Huoli Animation Technology Park',
      addressLocality: 'Panyu District, Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN'
    }
  ],
  sameAs: [
    'https://www.xiaohongshu.com/user/profile/66609efa0000000003033c40',
    'https://weibo.com/jiukutech',
    'https://www.douyin.com/user/MS4wLjABAAAAXJiKl7ApoIxCuRv2FS8yvIpVvNKyBnJBi78U9iREiXk',
    'https://x.com/jiukutech'
  ]
}

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
    dir: localeHead.value.htmlAttrs?.dir
  },
  link: [...(localeHead.value.link || [])],
  meta: [...(localeHead.value.meta || [])],
  script: [{
    key: 'organization-jsonld',
    type: 'application/ld+json',
    textContent: JSON.stringify(organization)
  }]
}))
</script>
