<script setup lang="ts">
import { products, type ProductCategory, type SiteLocale } from '~/data/products'
const { locale } = useI18n()
const localePath = useLocalePath()
const lang = computed(() => locale.value as SiteLocale)
const active = ref<'all' | ProductCategory>('all')
const copy = {
  'zh-cn': { title: '产品与解决方案', lead: '覆盖娃娃机、精品机、售卖设备及门店配套，并提供软硬件一体化定制。', all: '全部', claw: '娃娃机', boutique: '精品机', retail: '售卖设备', support: '配套设备', quote: '获取报价', solution: '不止于设备', solutionText: '九酷将设备选型、外观定制、SaaS 管理、物联网接入和场景设计整合为一套可执行方案。', points: ['设备与外观定制', 'SaaS 营收及库存管理', '物联网远程运维', '主题空间规划与交付'], cta: '联系团队讨论您的项目' },
  'zh-tw': { title: '產品與解決方案', lead: '涵蓋娃娃機、精品機、售賣設備及門店配套，並提供軟硬體一體化定制。', all: '全部', claw: '娃娃機', boutique: '精品機', retail: '售賣設備', support: '配套設備', quote: '獲取報價', solution: '不止於設備', solutionText: '九酷將設備選型、外觀定制、SaaS 管理、物聯網接入和場景設計整合為一套可執行方案。', points: ['設備與外觀定制', 'SaaS 營收及庫存管理', '物聯網遠端運維', '主題空間規劃與交付'], cta: '聯絡團隊討論您的專案' },
  'en-us': { title: 'Products and solutions', lead: 'Claw machines, premium games, retail and venue support equipment, with integrated hardware and software customization.', all: 'All', claw: 'Claw machines', boutique: 'Premium games', retail: 'Retail', support: 'Support equipment', quote: 'Request quote', solution: 'More than equipment', solutionText: 'Jiuku combines product selection, cabinet design, SaaS management, IoT connectivity and venue planning into one executable solution.', points: ['Equipment and cabinet customization', 'SaaS revenue and inventory management', 'Remote IoT maintenance', 'Themed space planning and delivery'], cta: 'Talk to our team about your project' }
} as const
const text = computed(() => copy[lang.value])
const seoCopy = computed(() => ({
  'zh-cn': { title: '娃娃机与无人娱乐设备｜九酷产品解决方案', description: '浏览九酷娃娃机、精品机、售卖设备和配套设备，了解设备定制、SaaS 管理、物联网运维及主题空间服务。' },
  'zh-tw': { title: '娃娃機與無人娛樂設備｜九酷產品解決方案', description: '瀏覽九酷娃娃機、精品機、售賣設備和配套設備，了解設備定制、SaaS 管理、物聯網運維及主題空間服務。' },
  'en-us': { title: 'Claw Machines & Amusement Equipment | JiuKu Products', description: 'Explore JiuKu claw machines, premium games, retail equipment, customization, SaaS management, IoT maintenance and venue solutions.' }
})[lang.value])
useHead(() => ({
  title: seoCopy.value.title,
  meta: [
    { name: 'description', content: seoCopy.value.description },
    { property: 'og:title', content: seoCopy.value.title },
    { property: 'og:description', content: seoCopy.value.description }
  ]
}))
const categories = ['all', 'claw', 'boutique', 'retail', 'support'] as const
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
