<script setup lang="ts">
import { products, type ProductCategory, type SiteLocale } from '~/data/products'

const { locale } = useI18n()
const localePath = useLocalePath()
const activeCategory = ref<'all' | ProductCategory>('all')
const lang = computed(() => locale.value as SiteLocale)

const copy = {
  'zh-cn': {
    eyebrow: '广州九酷游乐科技有限公司', title: '让每一台设备，成为场景里的快乐入口',
    heroText: '从娃娃机及无人娱乐设备，到场地管理系统与定制软件开发，提供硬件、软件与运营一体化服务。',
    explore: '浏览产品', consult: '项目咨询', products: '精选产品', productLead: '从单机到主题专区，为不同场地提供灵活的设备组合。',
    categories: { all: '全部', claw: '单人机型', stacked: '双层组合', multiplayer: '多人互动', themed: '主题定制' },
    quote: '获取报价', allProducts: '查看全部产品', solutions: '一体化解决方案', solutionLead: '设备、系统与空间同步规划，让项目更快落地并持续运营。',
    solutionItems: [
      ['设备定制', '根据礼品、玩法、场地与品牌要求，提供结构、外观和功能定制。'],
      ['SaaS 与物联网', '支持设备状态、营收、库存和会员运营的远程数字化管理。'],
      ['场景定制', '从设备组合到主题设计与落地，构建完整的娱乐消费空间。']
    ],
    softwareKicker: 'SOFTWARE DEVELOPMENT', softwareTitle: '软件开发与数字化运营', softwareLead: '九酷不只制造设备。我们正在开发场地管理系统，也面向企业提供定制软件与技术外包服务。', softwareCta: '咨询软件项目',
    softwareItems: [
      ['01', '场地管理系统', '围绕场地、设备、营收、库存与会员运营，构建更清晰的日常管理流程。', '开发中'],
      ['02', '设备与物联网接入', '连接设备状态与业务数据，为远程管理、告警和运营分析提供基础。', ''],
      ['03', '定制软件开发', '按实际业务需求开发企业管理系统、Web 应用、移动端及数据工具。', ''],
      ['04', '技术合作与外包开发', '可承接从需求梳理、产品设计到开发交付和持续迭代的软件项目。', '']
    ],
    globalKicker: 'GLOBAL PROJECTS', globalTitle: '美国与欧洲项目实景', globalLead: '从设备交付到场地运营，九酷产品正在更多海外场景中创造真实体验。以下为美国与欧洲项目现场拍摄。', globalRegions: '美国 · 欧洲',
    globalCases: [
      ['美国项目', '运营现场 · 01', '/videos/overseas-us-operation-01.mp4', '/videos/overseas-us-operation-01-poster.jpg'],
      ['欧洲项目', '场地巡览', '/videos/overseas-europe-world-jump.mp4', '/videos/overseas-europe-world-jump-poster.jpg'],
      ['美国项目', '运营现场 · 02', '/videos/overseas-us-operation-02.mp4', '/videos/overseas-us-operation-02-poster.jpg']
    ],
    strength: '从研发制造到运营服务', strengthText: '九酷创立于 2014 年，总部位于广州番禺，持续深耕无人娱乐设备及数字化运营。',
    stats: [['2014', '品牌创立'], ['广州番禺', '研发制造基地'], ['全链路', '设计、生产、系统、运营']],
    process: '合作流程', steps: [['01', '需求沟通'], ['02', '方案与选型'], ['03', '生产与交付'], ['04', '运营支持']],
    ctaTitle: '准备启动您的游乐项目？', ctaText: '告诉我们场地、预算和经营目标，九酷团队将为您匹配设备与落地方案。'
  },
  'zh-tw': {
    eyebrow: '廣州九酷遊樂科技有限公司', title: '讓每一台設備，成為場景裡的快樂入口',
    heroText: '從娃娃機及無人娛樂設備，到場地管理系統與定制軟體開發，提供硬體、軟體與營運一體化服務。',
    explore: '瀏覽產品', consult: '專案諮詢', products: '精選產品', productLead: '從單機到主題專區，為不同場地提供靈活的設備組合。',
    categories: { all: '全部', claw: '單人機型', stacked: '雙層組合', multiplayer: '多人互動', themed: '主題定制' },
    quote: '獲取報價', allProducts: '查看全部產品', solutions: '一體化解決方案', solutionLead: '設備、系統與空間同步規劃，讓專案更快落地並持續營運。',
    solutionItems: [['設備定制', '根據禮品、玩法、場地與品牌要求，提供結構、外觀和功能定制。'], ['SaaS 與物聯網', '支援設備狀態、營收、庫存和會員營運的遠端數位化管理。'], ['場景定制', '從設備組合到主題設計與落地，構建完整的娛樂消費空間。']],
    softwareKicker: 'SOFTWARE DEVELOPMENT', softwareTitle: '軟體開發與數位化營運', softwareLead: '九酷不只製造設備。我們正在開發場地管理系統，也面向企業提供定制軟體與技術外包服務。', softwareCta: '諮詢軟體專案',
    softwareItems: [
      ['01', '場地管理系統', '圍繞場地、設備、營收、庫存與會員營運，構建更清晰的日常管理流程。', '開發中'],
      ['02', '設備與物聯網接入', '連接設備狀態與業務數據，為遠端管理、告警和營運分析提供基礎。', ''],
      ['03', '定制軟體開發', '按實際業務需求開發企業管理系統、Web 應用、移動端及數據工具。', ''],
      ['04', '技術合作與外包開發', '可承接從需求梳理、產品設計到開發交付和持續迭代的軟體專案。', '']
    ],
    globalKicker: 'GLOBAL PROJECTS', globalTitle: '美國與歐洲專案實景', globalLead: '從設備交付到場地營運，九酷產品正在更多海外場景中創造真實體驗。以下為美國與歐洲專案現場拍攝。', globalRegions: '美國 · 歐洲',
    globalCases: [
      ['美國專案', '營運現場 · 01', '/videos/overseas-us-operation-01.mp4', '/videos/overseas-us-operation-01-poster.jpg'],
      ['歐洲專案', '場地巡覽', '/videos/overseas-europe-world-jump.mp4', '/videos/overseas-europe-world-jump-poster.jpg'],
      ['美國專案', '營運現場 · 02', '/videos/overseas-us-operation-02.mp4', '/videos/overseas-us-operation-02-poster.jpg']
    ],
    strength: '從研發製造到營運服務', strengthText: '九酷創立於 2014 年，總部位於廣州番禺，持續深耕無人娛樂設備及數位化營運。',
    stats: [['2014', '品牌創立'], ['廣州番禺', '研發製造基地'], ['全鏈路', '設計、生產、系統、營運']], process: '合作流程', steps: [['01', '需求溝通'], ['02', '方案與選型'], ['03', '生產與交付'], ['04', '營運支援']],
    ctaTitle: '準備啟動您的遊樂專案？', ctaText: '告訴我們場地、預算和經營目標，九酷團隊將為您匹配設備與落地方案。'
  },
  'en-us': {
    eyebrow: 'Guangzhou Jiuku Amusement Technology Co., Ltd.', title: 'Turn every machine into a destination for fun',
    heroText: 'From amusement equipment to venue management and custom software, JiuKu brings hardware, software and operations together.',
    explore: 'Explore products', consult: 'Start a project', products: 'Featured products', productLead: 'Flexible equipment combinations, from standalone machines to complete themed zones.',
    categories: { all: 'All', claw: 'Single player', stacked: 'Stacked systems', multiplayer: 'Multiplayer', themed: 'Custom themes' },
    quote: 'Request quote', allProducts: 'View all products', solutions: 'Integrated solutions', solutionLead: 'Equipment, software and space planned together for a faster launch and sustainable operation.',
    solutionItems: [['Equipment customization', 'Cabinet, appearance and function tailored to prizes, gameplay, venue and brand.'], ['SaaS and IoT', 'Remote visibility into machine status, revenue, inventory and member operations.'], ['Venue customization', 'Equipment planning, themed design and delivery for a complete entertainment space.']],
    softwareKicker: 'SOFTWARE DEVELOPMENT', softwareTitle: 'Software development for digital operations', softwareLead: 'JiuKu builds more than machines. We are developing a venue management platform and deliver custom software and outsourced engineering for businesses.', softwareCta: 'Discuss a software project',
    softwareItems: [
      ['01', 'Venue management platform', 'A clearer workflow for venues, equipment, revenue, inventory and member operations.', 'In development'],
      ['02', 'Equipment and IoT integration', 'Connect machine status and business data for remote management, alerts and operational insight.', ''],
      ['03', 'Custom software development', 'Business systems, web applications, mobile experiences and data tools built around real requirements.', ''],
      ['04', 'Engineering partnerships', 'End-to-end outsourced delivery from discovery and product design through development and iteration.', '']
    ],
    globalKicker: 'GLOBAL PROJECTS', globalTitle: 'Project footage from the United States and Europe', globalLead: 'From delivery to live venue operations, JiuKu equipment is creating real experiences in overseas markets.', globalRegions: 'UNITED STATES · EUROPE',
    globalCases: [
      ['United States', 'Live venue · 01', '/videos/overseas-us-operation-01.mp4', '/videos/overseas-us-operation-01-poster.jpg'],
      ['Europe', 'Venue walkthrough', '/videos/overseas-europe-world-jump.mp4', '/videos/overseas-europe-world-jump-poster.jpg'],
      ['United States', 'Live venue · 02', '/videos/overseas-us-operation-02.mp4', '/videos/overseas-us-operation-02-poster.jpg']
    ],
    strength: 'From R&D and production to operations', strengthText: 'Founded in 2014 and based in Panyu, Guangzhou, Jiuku focuses on unattended amusement equipment and digital operations.',
    stats: [['2014', 'Founded'], ['Guangzhou', 'R&D and production'], ['End to end', 'Design, production, software, operations']], process: 'How we work', steps: [['01', 'Discovery'], ['02', 'Planning'], ['03', 'Production'], ['04', 'Support']],
    ctaTitle: 'Ready to launch your amusement project?', ctaText: 'Share your venue, budget and operating goals. Our team will recommend the right equipment and delivery plan.'
  }
} as const

const text = computed(() => copy[lang.value])
const seoCopy = computed(() => ({
  'zh-cn': {
    title: '九酷游乐科技｜游乐设备、场地系统与软件开发',
    description: '九酷游乐提供娃娃机及无人娱乐设备、场地管理系统、SaaS、物联网、场景方案与定制软件开发服务。'
  },
  'zh-tw': {
    title: '九酷遊樂科技｜遊樂設備、場地系統與軟體開發',
    description: '九酷遊樂提供娃娃機及無人娛樂設備、場地管理系統、SaaS、物聯網、場景方案與定制軟體開發服務。'
  },
  'en-us': {
    title: 'JiuKu | Amusement Equipment & Custom Software',
    description: 'JiuKu delivers amusement equipment, venue management, SaaS, IoT, complete venue solutions and custom software development.'
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
const categories = ['all', 'claw', 'stacked', 'multiplayer', 'themed'] as const
</script>

<template>
  <main>
    <section class="home-hero">
      <img src="/products-owned/hero-machines.webp" :alt="text.products" class="home-hero-image">
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

    <section class="software-band">
      <div class="site-container software-layout">
        <div class="software-copy">
          <p class="section-kicker">{{ text.softwareKicker }}</p>
          <h2>{{ text.softwareTitle }}</h2>
          <p>{{ text.softwareLead }}</p>
          <NuxtLink :to="localePath('/contact')" class="button button-primary">{{ text.softwareCta }}</NuxtLink>
        </div>
        <div class="software-grid">
          <article v-for="item in text.softwareItems" :key="item[0]">
            <div><span>{{ item[0] }}</span><em v-if="item[3]">{{ item[3] }}</em></div>
            <h3>{{ item[1] }}</h3>
            <p>{{ item[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="global-projects">
      <div class="site-container">
        <div class="global-heading">
          <div><p class="section-kicker">{{ text.globalKicker }}</p><h2>{{ text.globalTitle }}</h2><p>{{ text.globalLead }}</p></div>
          <span>{{ text.globalRegions }}</span>
        </div>
        <div class="project-video-grid">
          <article v-for="item in text.globalCases" :key="item[2]" class="project-video-card">
            <video :poster="item[3]" controls playsinline muted preload="metadata" :aria-label="`${item[0]} ${item[1]}`">
              <source :src="item[2]" type="video/mp4">
            </video>
            <div><strong>{{ item[0] }}</strong><span>{{ item[1] }}</span></div>
          </article>
        </div>
      </div>
    </section>

    <section class="strength-band"><div class="site-container strength-layout"><div><p class="section-kicker">JIUKU</p><h2>{{ text.strength }}</h2><p>{{ text.strengthText }}</p></div><div class="stats-grid"><div v-for="stat in text.stats" :key="stat[0]"><strong>{{ stat[0] }}</strong><span>{{ stat[1] }}</span></div></div></div></section>

    <section class="section site-container"><div class="section-heading"><div><p class="section-kicker">PROCESS</p><h2>{{ text.process }}</h2></div></div><div class="process-grid"><div v-for="step in text.steps" :key="step[0]" class="process-step"><span>{{ step[0] }}</span><strong>{{ step[1] }}</strong></div></div></section>

    <section class="cta-band"><div class="site-container cta-layout"><div><h2>{{ text.ctaTitle }}</h2><p>{{ text.ctaText }}</p></div><NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.consult }}</NuxtLink></div></section>
  </main>
</template>
