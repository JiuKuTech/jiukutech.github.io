<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const copy = {
  'zh-cn': {
    metaTitle: '关于九酷 | 九酷游乐科技', metaDescription: '了解九酷游乐的公司定位、产品能力、服务体系与长期理念。',
    eyebrow: 'ABOUT JIUKU', title: '让设备、系统与场景，共同创造快乐',
    heroText: '九酷专注无人娱乐设备研发制造，并以软件、物联网和运营服务连接产品全生命周期。',
    introKicker: 'WHO WE ARE', introTitle: '扎根广州番禺，专注游乐科技',
    introText: '广州九酷游乐科技有限公司创立于 2014 年。我们从娃娃机等无人娱乐设备出发，持续拓展硬件研发、外观与功能定制、数字化管理和场景落地能力，为运营商提供更完整、更易执行的项目方案。',
    introText2: '我们关注的不只是设备交付，更是设备进入真实场景后的稳定体验、运营效率和长期价值。',
    facts: [['2014', '公司创立'], ['广州番禺', '研发与服务基地'], ['一体化', '设备、系统、场景与运营']],
    capabilityKicker: 'WHAT WE DO', capabilityTitle: '从一台设备到完整场景', capabilityLead: '围绕运营商的实际需求，将产品、技术和交付服务整合成清晰的能力体系。',
    capabilities: [
      { no: '01', title: '产品研发制造', text: '聚焦娃娃机、精品机、售卖及配套设备，兼顾结构可靠性、使用体验与维护便利。' },
      { no: '02', title: '软硬件一体化', text: '通过 SaaS 与物联网能力连接设备状态、营收、库存和运营管理，提升管理效率。' },
      { no: '03', title: '定制与场景设计', text: '根据品牌、礼品、玩法和场地特点，提供外观、功能、设备组合与主题空间方案。' },
      { no: '04', title: '交付与运营支持', text: '从需求沟通、方案选型到生产交付与后续维护，让项目推进更顺畅。' }
    ],
    approachKicker: 'OUR APPROACH', approachTitle: '把长期价值放在每一次选择里', approachText: '产品会更新，技术会变化，但可靠、坦诚和对用户体验的关注始终是九酷做事的基础。',
    values: [
      ['以用户为中心', '理解运营者与玩家的真实需求，用体验检验产品价值。'],
      ['持续创新', '以务实方式探索新技术、新玩法和更高效的运营工具。'],
      ['可靠合作', '重视质量、响应与长期沟通，与伙伴共同解决问题。']
    ],
    visionKicker: 'LOOKING AHEAD', visionTitle: '连接更多场景，创造更好的娱乐体验',
    visionText: '面向未来，九酷将继续深耕无人娱乐设备与数字化运营，让产品更可靠、管理更高效、场景更具吸引力，并与合作伙伴共同推动行业长期发展。',
    ctaTitle: '想进一步了解九酷？', ctaText: '欢迎告诉我们您的场地、产品或合作设想，我们会结合实际需求与您沟通。', ctaButton: '联系九酷'
  },
  'zh-tw': {
    metaTitle: '關於九酷 | 九酷遊樂科技', metaDescription: '了解九酷遊樂的公司定位、產品能力、服務體系與長期理念。',
    eyebrow: 'ABOUT JIUKU', title: '讓設備、系統與場景，共同創造快樂', heroText: '九酷專注無人娛樂設備研發製造，並以軟體、物聯網和營運服務連接產品全生命週期。',
    introKicker: 'WHO WE ARE', introTitle: '扎根廣州番禺，專注遊樂科技', introText: '廣州九酷遊樂科技有限公司創立於 2014 年。我們從娃娃機等無人娛樂設備出發，持續拓展硬體研發、外觀與功能定制、數位化管理和場景落地能力，為營運商提供更完整、更易執行的專案方案。', introText2: '我們關注的不只是設備交付，更是設備進入真實場景後的穩定體驗、營運效率和長期價值。',
    facts: [['2014', '公司創立'], ['廣州番禺', '研發與服務基地'], ['一體化', '設備、系統、場景與營運']],
    capabilityKicker: 'WHAT WE DO', capabilityTitle: '從一台設備到完整場景', capabilityLead: '圍繞營運商的實際需求，將產品、技術和交付服務整合成清晰的能力體系。',
    capabilities: [
      { no: '01', title: '產品研發製造', text: '聚焦娃娃機、精品機、售賣及配套設備，兼顧結構可靠性、使用體驗與維護便利。' },
      { no: '02', title: '軟硬體一體化', text: '透過 SaaS 與物聯網能力連接設備狀態、營收、庫存和營運管理，提升管理效率。' },
      { no: '03', title: '定制與場景設計', text: '根據品牌、禮品、玩法和場地特點，提供外觀、功能、設備組合與主題空間方案。' },
      { no: '04', title: '交付與營運支援', text: '從需求溝通、方案選型到生產交付與後續維護，讓專案推進更順暢。' }
    ],
    approachKicker: 'OUR APPROACH', approachTitle: '把長期價值放在每一次選擇裡', approachText: '產品會更新，技術會變化，但可靠、坦誠和對用戶體驗的關注始終是九酷做事的基礎。',
    values: [['以用戶為中心', '理解營運者與玩家的真實需求，用體驗檢驗產品價值。'], ['持續創新', '以務實方式探索新技術、新玩法和更高效的營運工具。'], ['可靠合作', '重視品質、回應與長期溝通，與夥伴共同解決問題。']],
    visionKicker: 'LOOKING AHEAD', visionTitle: '連接更多場景，創造更好的娛樂體驗', visionText: '面向未來，九酷將繼續深耕無人娛樂設備與數位化營運，讓產品更可靠、管理更高效、場景更具吸引力，並與合作夥伴共同推動行業長期發展。',
    ctaTitle: '想進一步了解九酷？', ctaText: '歡迎告訴我們您的場地、產品或合作設想，我們會結合實際需求與您溝通。', ctaButton: '聯絡九酷'
  },
  'en-us': {
    metaTitle: 'About JiuKu | JiuKu Amusement Technology', metaDescription: 'Learn about JiuKu’s company focus, product capabilities, service system and long-term approach.',
    eyebrow: 'ABOUT JIUKU', title: 'Equipment, software and spaces—working together to create fun', heroText: 'JiuKu develops and manufactures unattended amusement equipment, connecting the product lifecycle with software, IoT and operating support.',
    introKicker: 'WHO WE ARE', introTitle: 'Amusement technology, rooted in Panyu, Guangzhou', introText: 'Founded in 2014, Guangzhou JiuKu Amusement Technology began with unattended entertainment equipment such as claw machines. We continue to expand our capabilities across hardware development, appearance and function customization, digital management and venue delivery.', introText2: 'We look beyond equipment delivery to the experience, operating efficiency and long-term value each product creates in a real venue.',
    facts: [['2014', 'Founded'], ['Guangzhou', 'R&D and service base'], ['Integrated', 'Equipment, software, spaces and operations']],
    capabilityKicker: 'WHAT WE DO', capabilityTitle: 'From a single machine to a complete venue', capabilityLead: 'We bring products, technology and delivery services together around the practical needs of operators.',
    capabilities: [
      { no: '01', title: 'Product development', text: 'Claw, premium, retail and support equipment designed for reliability, usability and easier maintenance.' },
      { no: '02', title: 'Hardware and software', text: 'SaaS and IoT capabilities connect machine status, revenue, inventory and operating management.' },
      { no: '03', title: 'Customization and spaces', text: 'Appearance, function, equipment mix and themed spaces tailored to brands, prizes, gameplay and venues.' },
      { no: '04', title: 'Delivery and support', text: 'A connected path from discovery and product selection through production, delivery and ongoing service.' }
    ],
    approachKicker: 'OUR APPROACH', approachTitle: 'Long-term value in every decision', approachText: 'Products evolve and technology changes, but reliability, openness and attention to user experience remain the foundation of how we work.',
    values: [['User-centered', 'Understand real operator and player needs, and measure value through experience.'], ['Always improving', 'Explore new technology, gameplay and operating tools with a practical mindset.'], ['Reliable partnerships', 'Value quality, responsiveness and long-term communication while solving problems together.']],
    visionKicker: 'LOOKING AHEAD', visionTitle: 'Connecting more venues with better entertainment experiences', visionText: 'JiuKu will continue to advance unattended amusement equipment and digital operations—making products more reliable, management more efficient and venues more engaging while growing with our partners.',
    ctaTitle: 'Want to know more about JiuKu?', ctaText: 'Tell us about your venue, product needs or partnership idea, and our team will discuss the right direction with you.', ctaButton: 'Contact JiuKu'
  }
} as const

const lang = computed(() => (locale.value in copy ? locale.value : 'zh-cn') as keyof typeof copy)
const text = computed(() => copy[lang.value])
useHead(() => ({ title: text.value.metaTitle, meta: [{ name: 'description', content: text.value.metaDescription }] }))
</script>

<template>
  <main class="about-page">
    <section class="about-hero">
      <img src="/images/about-us.jpeg" :alt="text.title" class="about-hero-image">
      <div class="about-hero-shade"></div>
      <div class="site-container about-hero-content"><p class="about-kicker light">{{ text.eyebrow }}</p><h1>{{ text.title }}</h1><p>{{ text.heroText }}</p></div>
    </section>

    <section class="about-section site-container intro-layout">
      <div><p class="about-kicker">{{ text.introKicker }}</p><h2>{{ text.introTitle }}</h2></div>
      <div class="intro-copy"><p>{{ text.introText }}</p><p>{{ text.introText2 }}</p></div>
    </section>

    <section class="facts-band"><div class="site-container facts-grid"><div v-for="fact in text.facts" :key="fact[0]"><strong>{{ fact[0] }}</strong><span>{{ fact[1] }}</span></div></div></section>

    <section class="about-section site-container">
      <div class="about-heading"><p class="about-kicker">{{ text.capabilityKicker }}</p><h2>{{ text.capabilityTitle }}</h2><p>{{ text.capabilityLead }}</p></div>
      <div class="capability-grid"><article v-for="item in text.capabilities" :key="item.no"><span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div>
    </section>

    <section class="approach-section"><div class="site-container approach-layout">
      <div><p class="about-kicker light">{{ text.approachKicker }}</p><h2>{{ text.approachTitle }}</h2><p>{{ text.approachText }}</p></div>
      <div class="value-list"><article v-for="(value, index) in text.values" :key="value[0]"><span>0{{ index + 1 }}</span><div><h3>{{ value[0] }}</h3><p>{{ value[1] }}</p></div></article></div>
    </div></section>

    <section class="about-section site-container vision-layout">
      <div class="vision-mark">J</div><div><p class="about-kicker">{{ text.visionKicker }}</p><h2>{{ text.visionTitle }}</h2><p>{{ text.visionText }}</p></div>
    </section>

    <section class="about-cta"><div class="site-container about-cta-layout"><div><h2>{{ text.ctaTitle }}</h2><p>{{ text.ctaText }}</p></div><NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.ctaButton }}</NuxtLink></div></section>
  </main>
</template>

<style scoped>
.about-page { overflow: hidden; }
.about-kicker { margin: 0 0 12px; color: var(--brand); font-size: 12px; font-weight: 750; letter-spacing: .14em; }
.about-kicker.light { color: #8dccff; }
.about-section { padding-top: 96px; padding-bottom: 96px; }
.about-hero { position: relative; min-height: 600px; display: flex; align-items: center; color: #fff; background: #142e44; }
.about-hero-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.about-hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,27,44,.92), rgba(7,27,44,.65) 48%, rgba(7,27,44,.12)); }
.about-hero-content { position: relative; z-index: 1; padding-top: 80px; padding-bottom: 80px; }
.about-hero h1 { max-width: 780px; margin: 0 0 20px; font-size: clamp(42px, 5.8vw, 72px); line-height: 1.1; font-weight: 680; }
.about-hero-content > p:last-child { max-width: 680px; margin: 0; color: rgba(255,255,255,.84); font-size: 18px; line-height: 1.85; }
.intro-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 100px; }
.intro-layout h2, .about-heading h2, .approach-layout h2, .vision-layout h2, .about-cta h2 { margin: 0; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.2; font-weight: 650; }
.intro-copy p { margin: 0 0 18px; color: var(--muted); font-size: 17px; line-height: 1.9; }
.facts-band { background: var(--soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.facts-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.facts-grid div { min-width: 0; padding: 44px 34px; border-left: 1px solid var(--line); }
.facts-grid div:last-child { border-right: 1px solid var(--line); }
.facts-grid strong, .facts-grid span { display: block; }
.facts-grid strong { margin-bottom: 10px; color: var(--brand); font-size: 28px; }
.facts-grid span { color: var(--muted); line-height: 1.6; }
.about-heading { max-width: 760px; margin-bottom: 42px; }
.about-heading h2 { margin-bottom: 16px; }
.about-heading > p:last-child, .capability-grid p, .approach-layout > div > p:last-child, .value-list p, .vision-layout > div > p:last-child, .about-cta p { color: var(--muted); line-height: 1.85; }
.capability-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); }
.capability-grid article { padding: 34px 52px 38px 0; border-bottom: 1px solid var(--line); }
.capability-grid article:nth-child(even) { padding-left: 52px; border-left: 1px solid var(--line); }
.capability-grid span { color: var(--brand); font-size: 12px; font-weight: 700; }
.capability-grid h3 { margin: 16px 0 10px; font-size: 22px; }
.capability-grid p { margin: 0; }
.approach-section { padding: 100px 0; color: #fff; background: #142d42; }
.approach-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 100px; }
.approach-layout > div > p:last-child { color: #b8c6d2; }
.value-list { border-top: 1px solid rgba(255,255,255,.18); }
.value-list article { padding: 24px 0; display: grid; grid-template-columns: 54px 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,.18); }
.value-list span { color: #7fc4fb; font-size: 12px; }
.value-list h3 { margin: 0 0 7px; font-size: 19px; }
.value-list p { margin: 0; color: #aebdca; }
.vision-layout { display: grid; grid-template-columns: 180px 1fr; gap: 70px; align-items: center; }
.vision-mark { width: 160px; height: 160px; display: grid; place-items: center; color: #fff; background: var(--brand); font-size: 80px; font-weight: 750; }
.vision-layout h2 { max-width: 800px; margin-bottom: 18px; }
.vision-layout > div > p:last-child { max-width: 850px; margin-bottom: 0; }
.about-cta { padding: 66px 0; color: #fff; background: var(--brand); }
.about-cta-layout { display: flex; align-items: center; justify-content: space-between; gap: 48px; }
.about-cta h2 { margin-bottom: 10px; font-size: clamp(28px, 3vw, 40px); }
.about-cta p { max-width: 700px; margin: 0; color: rgba(255,255,255,.82); }
.about-cta .button { flex: 0 0 auto; }
@media (max-width: 900px) { .intro-layout, .approach-layout { grid-template-columns: 1fr; gap: 42px; } }
@media (max-width: 680px) {
  .about-section { padding-top: 68px; padding-bottom: 68px; }
  .about-hero { min-height: 610px; align-items: flex-end; }
  .about-hero-shade { background: linear-gradient(0deg, rgba(7,27,44,.94), rgba(7,27,44,.58) 70%, rgba(7,27,44,.15)); }
  .about-hero-content { padding-top: 130px; padding-bottom: 62px; }
  .about-hero h1 { font-size: 42px; }
  .about-hero-content > p:last-child { font-size: 16px; }
  .facts-grid { grid-template-columns: 1fr; }
  .facts-grid div, .facts-grid div:last-child { padding: 24px 0; border-left: 0; border-right: 0; border-bottom: 1px solid var(--line); }
  .capability-grid { grid-template-columns: 1fr; }
  .capability-grid article, .capability-grid article:nth-child(even) { padding: 26px 0; border-left: 0; }
  .approach-section { padding: 72px 0; }
  .vision-layout { grid-template-columns: 1fr; gap: 32px; }
  .vision-mark { width: 100px; height: 100px; font-size: 50px; }
  .about-cta-layout { align-items: stretch; flex-direction: column; gap: 28px; }
}
</style>
