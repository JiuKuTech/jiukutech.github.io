<script setup lang="ts">
import { guides, guideLabels } from '~/data/guides'
import type { SiteLocale } from '~/data/products'
const { locale } = useI18n()
const localePath = useLocalePath()
const lang = computed(() => locale.value as SiteLocale)
const text = computed(() => guideLabels[lang.value])
useHead(() => ({ title: `${text.value.title} | JiuKu`, meta: [{ name: 'description', content: text.value.intro }, { property: 'og:title', content: `${text.value.title} | JiuKu` }, { property: 'og:description', content: text.value.intro }] }))
</script>

<template>
  <main>
    <section class="catalog-hero"><div class="site-container"><p class="section-kicker">JIUKU</p><h1>{{ text.title }}</h1><p>{{ text.intro }}</p></div></section>
    <section class="section site-container guide-grid">
      <article v-for="guide in guides" :key="guide.slug" class="guide-card">
        <h2><NuxtLink :to="localePath(`/guides/${guide.slug}`)">{{ guide.copy[lang].title }}</NuxtLink></h2>
        <p>{{ guide.copy[lang].summary }}</p>
        <NuxtLink :to="localePath(`/guides/${guide.slug}`)">{{ text.read }} →</NuxtLink>
      </article>
    </section>
    <section class="cta-band"><div class="site-container cta-layout"><h2>{{ text.contact }}</h2><NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.contact }}</NuxtLink></div></section>
  </main>
</template>
