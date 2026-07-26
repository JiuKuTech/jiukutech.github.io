<script setup lang="ts">
import { products, type ProductCategory, type SiteLocale } from '~/data/products'
const { locale } = useI18n()
const localePath = useLocalePath()
const lang = computed(() => locale.value as SiteLocale)
const active = ref<'all' | ProductCategory>('all')
const copy = {
  'zh-cn': {
    title: '产品与服务', lead: '从自研游乐设备到场地管理系统与定制软件开发，为实体场景和企业运营提供完整支持。',
    all: '全部', claw: '单人机型', stacked: '双层组合', multiplayer: '多人互动', themed: '主题定制', quote: '获取报价',
    softwareKicker: 'SOFTWARE SERVICES', softwareTitle: '把真实业务需求，转化为可用的软件', softwareLead: '我们正在开发场地管理系统，同时承接企业管理系统、Web 应用、移动端、数据工具及软硬件联动项目。', softwareCta: '提交软件需求',
    softwareItems: [
      ['01', '场地管理系统', '围绕场地、设备、营收、库存与会员运营打造一体化管理能力。', '开发中'],
      ['02', 'SaaS 与物联网', '连接设备和业务数据，支持远程管理、状态告警与运营分析。', ''],
      ['03', '定制软件开发', '基于客户业务流程，完成需求分析、产品设计、开发、测试与交付。', ''],
      ['04', '技术外包与长期迭代', '可按阶段或长期合作，为新项目和既有系统提供开发与维护支持。', '']
    ],
    solution: '不止于设备', solutionText: '九酷将设备选型、外观定制、场地规划、数字化系统和软件开发整合为一套可执行方案。', points: ['设备与外观定制', 'SaaS 营收及库存管理', '物联网远程运维', '主题空间规划与交付', '定制软件与技术合作'], cta: '联系团队讨论您的项目'
  },
  'zh-tw': {
    title: '產品與服務', lead: '從自研遊樂設備到場地管理系統與定制軟體開發，為實體場景和企業營運提供完整支援。',
    all: '全部', claw: '單人機型', stacked: '雙層組合', multiplayer: '多人互動', themed: '主題定制', quote: '獲取報價',
    softwareKicker: 'SOFTWARE SERVICES', softwareTitle: '把真實業務需求，轉化為可用的軟體', softwareLead: '我們正在開發場地管理系統，同時承接企業管理系統、Web 應用、移動端、數據工具及軟硬體聯動專案。', softwareCta: '提交軟體需求',
    softwareItems: [
      ['01', '場地管理系統', '圍繞場地、設備、營收、庫存與會員營運打造一體化管理能力。', '開發中'],
      ['02', 'SaaS 與物聯網', '連接設備和業務數據，支援遠端管理、狀態告警與營運分析。', ''],
      ['03', '定制軟體開發', '基於客戶業務流程，完成需求分析、產品設計、開發、測試與交付。', ''],
      ['04', '技術外包與長期迭代', '可按階段或長期合作，為新專案和既有系統提供開發與維護支援。', '']
    ],
    solution: '不止於設備', solutionText: '九酷將設備選型、外觀定制、場地規劃、數位化系統和軟體開發整合為一套可執行方案。', points: ['設備與外觀定制', 'SaaS 營收及庫存管理', '物聯網遠端運維', '主題空間規劃與交付', '定制軟體與技術合作'], cta: '聯絡團隊討論您的專案'
  },
  'en-us': {
    title: 'Products & services', lead: 'From original amusement equipment to venue management and custom software, we support physical venues and digital operations.',
    all: 'All', claw: 'Single player', stacked: 'Stacked systems', multiplayer: 'Multiplayer', themed: 'Custom themes', quote: 'Request quote',
    softwareKicker: 'SOFTWARE SERVICES', softwareTitle: 'Turn real business needs into useful software', softwareLead: 'We are developing a venue management platform and take on business systems, web applications, mobile experiences, data tools and connected hardware-software projects.', softwareCta: 'Share your software brief',
    softwareItems: [
      ['01', 'Venue management platform', 'Integrated management for venues, equipment, revenue, inventory and member operations.', 'In development'],
      ['02', 'SaaS and IoT', 'Connect equipment and business data for remote management, status alerts and operational analysis.', ''],
      ['03', 'Custom software development', 'Discovery, product design, engineering, testing and delivery built around your workflow.', ''],
      ['04', 'Outsourced engineering', 'Project-based or long-term development and maintenance for new and existing systems.', '']
    ],
    solution: 'More than equipment', solutionText: 'JiuKu combines product selection, cabinet design, venue planning, digital systems and custom software into one executable solution.', points: ['Equipment and cabinet customization', 'SaaS revenue and inventory management', 'Remote IoT maintenance', 'Themed space planning and delivery', 'Custom software and engineering partnerships'], cta: 'Talk to our team about your project'
  }
} as const
const text = computed(() => copy[lang.value])
const seoCopy = computed(() => ({
  'zh-cn': { title: '游乐设备、场地管理系统与软件开发｜九酷产品与服务', description: '浏览九酷游乐设备，了解场地管理系统、SaaS、物联网、场景定制及软件外包开发服务。' },
  'zh-tw': { title: '遊樂設備、場地管理系統與軟體開發｜九酷產品與服務', description: '瀏覽九酷遊樂設備，了解場地管理系統、SaaS、物聯網、場景定制及軟體外包開發服務。' },
  'en-us': { title: 'Amusement Equipment & Custom Software | JiuKu Services', description: 'Explore JiuKu amusement equipment, venue management, SaaS, IoT, venue customization and outsourced software development.' }
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
    <section class="software-band">
      <div class="site-container software-layout">
        <div class="software-copy"><p class="section-kicker">{{ text.softwareKicker }}</p><h2>{{ text.softwareTitle }}</h2><p>{{ text.softwareLead }}</p><NuxtLink :to="localePath('/contact')" class="button button-primary">{{ text.softwareCta }}</NuxtLink></div>
        <div class="software-grid"><article v-for="item in text.softwareItems" :key="item[0]"><div><span>{{ item[0] }}</span><em v-if="item[3]">{{ item[3] }}</em></div><h3>{{ item[1] }}</h3><p>{{ item[2] }}</p></article></div>
      </div>
    </section>
    <section class="service-detail"><div class="site-container service-detail-layout"><div><p class="section-kicker">CAPABILITY</p><h2>{{ text.solution }}</h2><p>{{ text.solutionText }}</p><NuxtLink :to="localePath('/contact')" class="button button-primary">{{ text.cta }}</NuxtLink></div><ul><li v-for="(point, i) in text.points" :key="point"><span>0{{ i + 1 }}</span>{{ point }}</li></ul></div></section>
  </main>
</template>
