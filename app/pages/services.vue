<script setup lang="ts">
import { products, type ProductCategory, type SiteLocale } from '~/data/products'
const { locale } = useI18n()
const localePath = useLocalePath()
const lang = computed(() => locale.value as SiteLocale)
const active = ref<'all' | ProductCategory>('all')
const copy = {
  'zh-cn': { title: '我们的产品', lead: '展示九酷自研制造的单人娃娃机、双层组合机、多人互动设备与主题定制机型。', all: '全部', claw: '单人机型', stacked: '双层组合', multiplayer: '多人互动', themed: '主题定制', quote: '获取报价', solution: '不止于设备', solutionText: '九酷将设备选型、外观定制、SaaS 管理、物联网接入和场景设计整合为一套可执行方案。', points: ['设备与外观定制', 'SaaS 营收及库存管理', '物联网远程运维', '主题空间规划与交付'], cta: '联系团队讨论您的项目' },
  'zh-tw': { title: '我們的產品', lead: '展示九酷自研製造的單人娃娃機、雙層組合機、多人互動設備與主題定制機型。', all: '全部', claw: '單人機型', stacked: '雙層組合', multiplayer: '多人互動', themed: '主題定制', quote: '獲取報價', solution: '不止於設備', solutionText: '九酷將設備選型、外觀定制、SaaS 管理、物聯網接入和場景設計整合為一套可執行方案。', points: ['設備與外觀定制', 'SaaS 營收及庫存管理', '物聯網遠端運維', '主題空間規劃與交付'], cta: '聯絡團隊討論您的專案' },
  'en-us': { title: 'Our products', lead: 'Explore JiuKu-built single-player claw machines, stacked systems, multiplayer centers and custom-themed cabinets.', all: 'All', claw: 'Single player', stacked: 'Stacked systems', multiplayer: 'Multiplayer', themed: 'Custom themes', quote: 'Request quote', solution: 'More than equipment', solutionText: 'JiuKu combines product selection, cabinet design, SaaS management, IoT connectivity and venue planning into one executable solution.', points: ['Equipment and cabinet customization', 'SaaS revenue and inventory management', 'Remote IoT maintenance', 'Themed space planning and delivery'], cta: 'Talk to our team about your project' }
} as const
const text = computed(() => copy[lang.value])
const seoCopy = computed(() => ({
  'zh-cn': { title: '娃娃机与多人互动设备｜九酷自研产品', description: '浏览九酷单人娃娃机、双层组合机、多人互动中心与主题定制机型，了解设备定制、SaaS、物联网及场景服务。' },
  'zh-tw': { title: '娃娃機與多人互動設備｜九酷自研產品', description: '瀏覽九酷單人娃娃機、雙層組合機、多人互動中心與主題定制機型，了解設備定制、SaaS、物聯網及場景服務。' },
  'en-us': { title: 'Claw Machines & Multiplayer Equipment | JiuKu Products', description: 'Explore JiuKu single-player claw machines, stacked systems, multiplayer centers, custom themes, SaaS, IoT and venue solutions.' }
})[lang.value])
useHead(() => ({
  title: seoCopy.value.title,
  meta: [
    { name: 'description', content: seoCopy.value.description },
    { property: 'og:title', content: seoCopy.value.title },
    { property: 'og:description', content: seoCopy.value.description }
  ]
}))
const categories = ['all', 'claw', 'stacked', 'multiplayer', 'themed'] as const
const list = computed(() => products.filter(p => active.value === 'all' || p.category === active.value))
</script>

<template>
  <main>
    <section class="catalog-hero"><div class="site-container"><p class="section-kicker">JIUKU CATALOG</p><h1>{{ text.title }}</h1><p>{{ text.lead }}</p></div></section>
    <section class="section site-container">
      <div class="filter-tabs catalog-filter"><button v-for="category in categories" :key="category" :class="{ active: active === category }" @click="active = category">{{ text[category] }}</button></div>
      <div class="product-grid catalog-grid"><article v-for="product in list" :key="product.id" class="product-card"><div class="product-image-wrap"><img :src="product.image" :alt="product.name[lang]" loading="lazy"></div><div class="product-content"><span class="product-category">{{ text[product.category] }}</span><h2>{{ product.name[lang] }}</h2><p>{{ product.description[lang] }}</p><NuxtLink :to="localePath('/contact')">{{ text.quote }} <span aria-hidden="true">→</span></NuxtLink></div></article></div>
    </section>
    <section class="service-detail"><div class="site-container service-detail-layout"><div><p class="section-kicker">CAPABILITY</p><h2>{{ text.solution }}</h2><p>{{ text.solutionText }}</p><NuxtLink :to="localePath('/contact')" class="button button-primary">{{ text.cta }}</NuxtLink></div><ul><li v-for="(point, i) in text.points" :key="point"><span>0{{ i + 1 }}</span>{{ point }}</li></ul></div></section>
  </main>
</template>
