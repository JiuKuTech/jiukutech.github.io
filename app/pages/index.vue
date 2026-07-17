<script setup lang="ts">
import { products, type ProductCategory, type SiteLocale } from '~/data/products'

const { locale } = useI18n()
const localePath = useLocalePath()
const activeCategory = ref<'all' | ProductCategory>('all')
const lang = computed(() => locale.value as SiteLocale)

const copy = {
  'zh-cn': {
    eyebrow: '广州九酷游乐科技有限公司', title: '让每一台设备，成为场景里的快乐入口',
    heroText: '专注娃娃机及无人娱乐设备研发制造，提供硬件、SaaS、物联网与投放运营一体化服务。',
    explore: '浏览产品', consult: '项目咨询', products: '精选产品', productLead: '从单机到主题专区，为不同场地提供灵活的设备组合。',
    categories: { all: '全部', claw: '娃娃机', boutique: '精品机', retail: '售卖设备', support: '配套设备' },
    quote: '获取报价', allProducts: '查看全部产品', solutions: '一体化解决方案', solutionLead: '设备、系统与空间同步规划，让项目更快落地并持续运营。',
    solutionItems: [
      ['设备定制', '根据礼品、玩法、场地与品牌要求，提供结构、外观和功能定制。'],
      ['SaaS 与物联网', '支持设备状态、营收、库存和会员运营的远程数字化管理。'],
      ['场景定制', '从设备组合到主题设计与落地，构建完整的娱乐消费空间。']
    ],
    strength: '从研发制造到运营服务', strengthText: '九酷创立于 2014 年，总部位于广州番禺，持续深耕无人娱乐设备及数字化运营。',
    stats: [['2014', '品牌创立'], ['广州番禺', '研发制造基地'], ['全链路', '设计、生产、系统、运营']],
    process: '合作流程', steps: [['01', '需求沟通'], ['02', '方案与选型'], ['03', '生产与交付'], ['04', '运营支持']],
    ctaTitle: '准备启动您的游乐项目？', ctaText: '告诉我们场地、预算和经营目标，九酷团队将为您匹配设备与落地方案。'
  },
  'zh-tw': {
    eyebrow: '廣州九酷遊樂科技有限公司', title: '讓每一台設備，成為場景裡的快樂入口',
    heroText: '專注娃娃機及無人娛樂設備研發製造，提供硬體、SaaS、物聯網與投放營運一體化服務。',
    explore: '瀏覽產品', consult: '專案諮詢', products: '精選產品', productLead: '從單機到主題專區，為不同場地提供靈活的設備組合。',
    categories: { all: '全部', claw: '娃娃機', boutique: '精品機', retail: '售賣設備', support: '配套設備' },
    quote: '獲取報價', allProducts: '查看全部產品', solutions: '一體化解決方案', solutionLead: '設備、系統與空間同步規劃，讓專案更快落地並持續營運。',
    solutionItems: [['設備定制', '根據禮品、玩法、場地與品牌要求，提供結構、外觀和功能定制。'], ['SaaS 與物聯網', '支援設備狀態、營收、庫存和會員營運的遠端數位化管理。'], ['場景定制', '從設備組合到主題設計與落地，構建完整的娛樂消費空間。']],
    strength: '從研發製造到營運服務', strengthText: '九酷創立於 2014 年，總部位於廣州番禺，持續深耕無人娛樂設備及數位化營運。',
    stats: [['2014', '品牌創立'], ['廣州番禺', '研發製造基地'], ['全鏈路', '設計、生產、系統、營運']], process: '合作流程', steps: [['01', '需求溝通'], ['02', '方案與選型'], ['03', '生產與交付'], ['04', '營運支援']],
    ctaTitle: '準備啟動您的遊樂專案？', ctaText: '告訴我們場地、預算和經營目標，九酷團隊將為您匹配設備與落地方案。'
  },
  'en-us': {
    eyebrow: 'Guangzhou Jiuku Amusement Technology Co., Ltd.', title: 'Turn every machine into a destination for fun',
    heroText: 'Claw machines and unattended entertainment equipment, backed by hardware, SaaS, IoT and operating support.',
    explore: 'Explore products', consult: 'Start a project', products: 'Featured products', productLead: 'Flexible equipment combinations, from standalone machines to complete themed zones.',
    categories: { all: 'All', claw: 'Claw machines', boutique: 'Premium games', retail: 'Retail', support: 'Support equipment' },
    quote: 'Request quote', allProducts: 'View all products', solutions: 'Integrated solutions', solutionLead: 'Equipment, software and space planned together for a faster launch and sustainable operation.',
    solutionItems: [['Equipment customization', 'Cabinet, appearance and function tailored to prizes, gameplay, venue and brand.'], ['SaaS and IoT', 'Remote visibility into machine status, revenue, inventory and member operations.'], ['Venue customization', 'Equipment planning, themed design and delivery for a complete entertainment space.']],
    strength: 'From R&D and production to operations', strengthText: 'Founded in 2014 and based in Panyu, Guangzhou, Jiuku focuses on unattended amusement equipment and digital operations.',
    stats: [['2014', 'Founded'], ['Guangzhou', 'R&D and production'], ['End to end', 'Design, production, software, operations']], process: 'How we work', steps: [['01', 'Discovery'], ['02', 'Planning'], ['03', 'Production'], ['04', 'Support']],
    ctaTitle: 'Ready to launch your amusement project?', ctaText: 'Share your venue, budget and operating goals. Our team will recommend the right equipment and delivery plan.'
  }
} as const

const text = computed(() => copy[lang.value])
const seoCopy = computed(() => ({
  'zh-cn': {
    title: '九酷游乐科技｜广州娃娃机与无人娱乐设备厂家',
    description: '九酷游乐专注娃娃机、精品机、扭蛋机及无人娱乐设备研发制造，提供设备定制、SaaS、物联网和场景解决方案。'
  },
  'zh-tw': {
    title: '九酷遊樂科技｜廣州娃娃機與無人娛樂設備廠家',
    description: '九酷遊樂專注娃娃機、精品機、扭蛋機及無人娛樂設備研發製造，提供設備定制、SaaS、物聯網和場景解決方案。'
  },
  'en-us': {
    title: 'JiuKu | Claw Machine & Amusement Equipment Manufacturer',
    description: 'JiuKu manufactures claw machines and unattended amusement equipment with customization, SaaS, IoT and complete venue solutions.'
  }
})[lang.value])
useHead(() => ({
  title: seoCopy.value.title,
  meta: [
    { name: 'description', content: seoCopy.value.description },
    { property: 'og:title', content: seoCopy.value.title },
    { property: 'og:description', content: seoCopy.value.description },
    { property: 'og:type', content: 'website' }
  ]
}))
const featured = computed(() => products.filter(p => activeCategory.value === 'all' || p.category === activeCategory.value).slice(0, 6))
const categories = ['all', 'claw', 'boutique', 'retail', 'support'] as const
</script>

<template>
  <main>
    <section class="home-hero">
      <img src="/products/overseas-claw.webp" alt="九酷娃娃机" class="home-hero-image">
      <div class="home-hero-shade"></div>
      <div class="site-container home-hero-content">
        <p class="eyebrow">{{ text.eyebrow }}</p>
        <h1>{{ text.title }}</h1>
        <p class="hero-copy">{{ text.heroText }}</p>
        <div class="button-row">
          <a href="#products" class="button button-primary">{{ text.explore }}</a>
          <NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.consult }}</NuxtLink>
        </div>
      </div>
    </section>

    <section id="products" class="section site-container">
      <div class="section-heading"><div><p class="section-kicker">PRODUCTS</p><h2>{{ text.products }}</h2><p>{{ text.productLead }}</p></div></div>
      <div class="filter-tabs" role="tablist" :aria-label="text.products">
        <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }" @click="activeCategory = category">{{ text.categories[category] }}</button>
      </div>
      <div class="product-grid">
        <article v-for="product in featured" :key="product.id" class="product-card">
          <div class="product-image-wrap"><img :src="product.image" :alt="product.name[lang]" loading="lazy"></div>
          <div class="product-content"><span class="product-category">{{ text.categories[product.category] }}</span><h3>{{ product.name[lang] }}</h3><p>{{ product.description[lang] }}</p><NuxtLink :to="localePath('/contact')">{{ text.quote }} <span aria-hidden="true">→</span></NuxtLink></div>
        </article>
      </div>
      <div class="section-action"><NuxtLink :to="localePath('/services')" class="button button-outline">{{ text.allProducts }}</NuxtLink></div>
    </section>

    <section class="section solutions-band">
      <div class="site-container"><div class="section-heading"><div><p class="section-kicker">SOLUTIONS</p><h2>{{ text.solutions }}</h2><p>{{ text.solutionLead }}</p></div></div>
        <div class="solution-grid"><article v-for="(item, index) in text.solutionItems" :key="item[0]" class="solution-item"><span>0{{ index + 1 }}</span><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p></article></div>
      </div>
    </section>

    <section class="strength-band"><div class="site-container strength-layout"><div><p class="section-kicker">JIUKU</p><h2>{{ text.strength }}</h2><p>{{ text.strengthText }}</p></div><div class="stats-grid"><div v-for="stat in text.stats" :key="stat[0]"><strong>{{ stat[0] }}</strong><span>{{ stat[1] }}</span></div></div></div></section>

    <section class="section site-container"><div class="section-heading"><div><p class="section-kicker">PROCESS</p><h2>{{ text.process }}</h2></div></div><div class="process-grid"><div v-for="step in text.steps" :key="step[0]" class="process-step"><span>{{ step[0] }}</span><strong>{{ step[1] }}</strong></div></div></section>

    <section class="cta-band"><div class="site-container cta-layout"><div><h2>{{ text.ctaTitle }}</h2><p>{{ text.ctaText }}</p></div><NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.consult }}</NuxtLink></div></section>
  </main>
</template>
