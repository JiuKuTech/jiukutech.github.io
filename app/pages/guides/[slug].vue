<script setup lang="ts">
import { guides, guideLabels } from '~/data/guides'
import type { SiteLocale } from '~/data/products'
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const guide = computed(() => guides.find(item => item.slug === route.params.slug))
if (!guide.value) throw createError({ statusCode: 404, statusMessage: 'Guide not found' })
const lang = computed(() => locale.value as SiteLocale)
const article = computed(() => guide.value?.copy[lang.value])
const labels = computed(() => guideLabels[lang.value])
useHead(() => ({
  title: `${article.value?.title} | JiuKu`,
  meta: [
    { name: 'description', content: article.value?.summary },
    { property: 'og:title', content: article.value?.title },
    { property: 'og:description', content: article.value?.summary },
    { property: 'og:type', content: 'article' }
  ],
  script: [{ key: 'guide-jsonld', type: 'application/ld+json', textContent: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: article.value?.title, description: article.value?.summary, inLanguage: lang.value, author: { '@type': 'Organization', name: 'JiuKu' }, url: `https://jiukuclaw.com${localePath(`/guides/${guide.value?.slug}`)}` }) }]
}))
</script>

<template>
  <main v-if="article">
    <article class="section site-container guide-article">
      <NuxtLink :to="localePath('/guides')">← {{ labels.back }}</NuxtLink>
      <h1>{{ article.title }}</h1><p class="guide-summary">{{ article.summary }}</p>
      <section v-for="section in article.sections" :key="section.title"><h2>{{ section.title }}</h2><p>{{ section.body }}</p></section>
      <div class="button-row"><NuxtLink :to="localePath('/contact')" class="button button-primary">{{ labels.contact }}</NuxtLink><NuxtLink :to="localePath('/services')" class="button button-outline">{{ labels.quote }}</NuxtLink></div>
      <aside class="guide-related"><h2>{{ labels.back }}</h2><ul><li v-for="item in guides.filter(item => item.slug !== guide?.slug)" :key="item.slug"><NuxtLink :to="localePath(`/guides/${item.slug}`)">{{ item.copy[lang].title }}</NuxtLink></li></ul></aside>
    </article>
  </main>
</template>
