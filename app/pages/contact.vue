<script setup lang="ts">
const { locale } = useI18n()

const copy = {
  'zh-cn': {
    metaTitle: '联系我们 | 九酷游乐科技', metaDescription: '联系九酷游乐，咨询游乐设备、场景管理系统、SaaS、物联网与定制软件开发。',
    eyebrow: 'CONTACT JIUKU', title: '从一个想法，开始一场快乐合作', heroText: '无论是单台设备、整店规划、场地管理系统还是定制软件开发，欢迎把您的需求告诉我们。',
    contactKicker: 'GET IN TOUCH', contactTitle: '选择适合您的联系方式', contactLead: '您可以直接来电、通过 WhatsApp、发送邮件或添加微信。提供项目基本信息，有助于我们更准确地理解需求。',
    phone: '电话 / WhatsApp', phoneHint: '适合产品、报价、海外项目与软件开发咨询', whatsappAction: 'WhatsApp：+86 137 1044 1030', email: '邮件联系', emailHint: '适合发送需求文件与合作资料',
    companyAddress: '公司地址', companyAddressValue: '广东省广州市番禺区活力动漫科技园 A 座 102', companyAddressHint: '商务洽谈与到访请提前预约',
    factoryAddress: '工厂地址', factoryAddressValue: '广东省广州市番禺区活力动漫科技园 B 座 421', factoryAddressHint: '生产及设备查看请提前与团队确认',
    wechat: '微信联系', wechatHint: '扫码添加，沟通产品与项目需求',
    briefKicker: 'PROJECT BRIEF', briefTitle: '告诉我们这些信息', briefText: '不需要准备复杂方案。以下几项信息即可帮助团队快速了解项目方向。',
    brief: [
      ['项目类型与目标', '游乐设备、整店规划、场地系统或定制软件'],
      ['场地或业务流程', '所在地区、使用场景、现有流程与主要痛点'],
      ['产品、功能与集成', '设备数量、期望功能，或需要对接的系统与数据'],
      ['时间与预算', '计划开业时间和大致预算范围']
    ],
    processKicker: 'NEXT STEPS', processTitle: '一次清晰、高效的项目沟通',
    steps: [['01', '初步沟通', '了解场地、业务流程与项目目标'], ['02', '方案建议', '匹配设备、系统功能与实施方向'], ['03', '确认落地', '细化报价、生产或开发、交付与后续支持']],
    visitTitle: '欢迎与九酷团队见面', visitText: '如需到访展厅或现场查看设备，请提前联系我们确认时间，以便安排更有针对性的接待与沟通。', visitButton: '拨打电话'
  },
  'zh-tw': {
    metaTitle: '聯絡我們 | 九酷遊樂科技', metaDescription: '聯絡九酷遊樂，諮詢遊樂設備、場地管理系統、SaaS、物聯網與定制軟體開發。',
    eyebrow: 'CONTACT JIUKU', title: '從一個想法，開始一場快樂合作', heroText: '無論是單台設備、整店規劃、場地管理系統還是定制軟體開發，歡迎把您的需求告訴我們。',
    contactKicker: 'GET IN TOUCH', contactTitle: '選擇適合您的聯絡方式', contactLead: '您可以直接來電、透過 WhatsApp、發送郵件或添加微信。提供專案基本資訊，有助於我們更準確地理解需求。',
    phone: '電話 / WhatsApp', phoneHint: '適合產品、報價、海外專案與軟體開發諮詢', whatsappAction: 'WhatsApp：+86 137 1044 1030', email: '郵件聯絡', emailHint: '適合發送需求文件與合作資料',
    companyAddress: '公司地址', companyAddressValue: '廣東省廣州市番禺區活力動漫科技園 A 座 102', companyAddressHint: '商務洽談與到訪請提前預約',
    factoryAddress: '工廠地址', factoryAddressValue: '廣東省廣州市番禺區活力動漫科技園 B 座 421', factoryAddressHint: '生產及設備查看請提前與團隊確認',
    wechat: '微信聯絡', wechatHint: '掃碼添加，溝通產品與專案需求',
    briefKicker: 'PROJECT BRIEF', briefTitle: '告訴我們這些資訊', briefText: '不需要準備複雜方案。以下幾項資訊即可幫助團隊快速了解專案方向。',
    brief: [['專案類型與目標', '遊樂設備、整店規劃、場地系統或定制軟體'], ['場地或業務流程', '所在地區、使用場景、現有流程與主要痛點'], ['產品、功能與整合', '設備數量、期望功能，或需要對接的系統與數據'], ['時間與預算', '計畫開業時間和大致預算範圍']],
    processKicker: 'NEXT STEPS', processTitle: '一次清晰、高效的專案溝通',
    steps: [['01', '初步溝通', '了解場地、業務流程與專案目標'], ['02', '方案建議', '匹配設備、系統功能與實施方向'], ['03', '確認落地', '細化報價、生產或開發、交付與後續支援']],
    visitTitle: '歡迎與九酷團隊見面', visitText: '如需到訪展廳或現場查看設備，請提前聯絡我們確認時間，以便安排更有針對性的接待與溝通。', visitButton: '撥打電話'
  },
  'en-us': {
    metaTitle: 'Contact | JiuKu Amusement Technology', metaDescription: 'Contact JiuKu about amusement equipment, venue management systems, SaaS, IoT and custom software development.',
    eyebrow: 'CONTACT JIUKU', title: 'A great partnership can start with one idea', heroText: 'From a single machine or complete venue to a management platform or custom software build, tell us what you are planning.',
    contactKicker: 'GET IN TOUCH', contactTitle: 'Choose the best way to reach us', contactLead: 'Call, use WhatsApp, email or connect through WeChat. A few project details will help us understand your needs more accurately.',
    phone: 'Phone / WhatsApp', phoneHint: 'For products, quotations, overseas projects and software enquiries', whatsappAction: 'WhatsApp: +86 137 1044 1030', email: 'Email us', emailHint: 'For requirements, documents and partnership materials',
    companyAddress: 'Company address', companyAddressValue: 'Room 102, Building A, Huoli Animation Technology Park, Panyu District, Guangzhou, Guangdong, China', companyAddressHint: 'Please arrange an appointment for meetings and visits',
    factoryAddress: 'Factory address', factoryAddressValue: 'Room 421, Building B, Huoli Animation Technology Park, Panyu District, Guangzhou, Guangdong, China', factoryAddressHint: 'Please contact our team before a production or equipment visit',
    wechat: 'WeChat', wechatHint: 'Scan to discuss products and project needs',
    briefKicker: 'PROJECT BRIEF', briefTitle: 'What to tell us', briefText: 'You do not need a complex proposal. These details are enough to help our team understand the direction.',
    brief: [['Project type and goal', 'Equipment, venue planning, management platform or custom software'], ['Venue or workflow', 'Location, use case, current process and the problem to solve'], ['Products, features and integrations', 'Equipment quantity, expected functions, systems or data to connect'], ['Timing and budget', 'Target launch date and approximate budget range']],
    processKicker: 'NEXT STEPS', processTitle: 'A clear and efficient project conversation',
    steps: [['01', 'Discovery', 'Understand the venue, workflow and project goals'], ['02', 'Recommendations', 'Define the right equipment, system features and delivery direction'], ['03', 'Delivery planning', 'Confirm quotation, production or development, launch and ongoing support']],
    visitTitle: 'Meet the JiuKu team', visitText: 'If you would like to visit our showroom or view equipment on site, contact us in advance so we can prepare a more relevant discussion.', visitButton: 'Call now'
  }
} as const

const lang = computed(() => (locale.value in copy ? locale.value : 'zh-cn') as keyof typeof copy)
const text = computed(() => copy[lang.value])
useHead(() => ({ title: text.value.metaTitle, meta: [{ name: 'description', content: text.value.metaDescription }] }))
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero">
      <img src="/images/contact.png" :alt="text.title" class="contact-hero-image">
      <div class="contact-hero-shade"></div>
      <div class="site-container contact-hero-content"><p class="contact-kicker light">{{ text.eyebrow }}</p><h1>{{ text.title }}</h1><p>{{ text.heroText }}</p></div>
    </section>

    <section class="contact-section site-container">
      <div class="contact-heading"><p class="contact-kicker">{{ text.contactKicker }}</p><h2>{{ text.contactTitle }}</h2><p>{{ text.contactLead }}</p></div>
      <div class="contact-grid">
        <article class="contact-card"><span>01</span><h3>{{ text.phone }}</h3><div class="contact-actions"><a href="tel:+8613710441030">+86 137 1044 1030</a><a class="whatsapp-action" href="https://wa.me/8613710441030" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>{{ text.whatsappAction }}</a></div><p>{{ text.phoneHint }}</p></article>
        <article class="contact-card"><span>02</span><h3>{{ text.email }}</h3><a href="mailto:82096004@qq.com">82096004@qq.com</a><p>{{ text.emailHint }}</p></article>
        <article class="contact-card address-card"><span>03</span><h3>{{ text.companyAddress }}</h3><strong>{{ text.companyAddressValue }}</strong><p>{{ text.companyAddressHint }}</p></article>
        <article class="contact-card address-card"><span>04</span><h3>{{ text.factoryAddress }}</h3><strong>{{ text.factoryAddressValue }}</strong><p>{{ text.factoryAddressHint }}</p></article>
        <article class="contact-card wechat-card"><div><span>05</span><h3>{{ text.wechat }}</h3><p>{{ text.wechatHint }}</p></div><img src="/images/Wechat-QRC.png" :alt="text.wechat">
        </article>
      </div>
    </section>

    <section class="brief-section"><div class="site-container brief-layout">
      <div><p class="contact-kicker light">{{ text.briefKicker }}</p><h2>{{ text.briefTitle }}</h2><p>{{ text.briefText }}</p></div>
      <ul><li v-for="(item, index) in text.brief" :key="item[0]"><span>0{{ index + 1 }}</span><div><strong>{{ item[0] }}</strong><p>{{ item[1] }}</p></div></li></ul>
    </div></section>

    <section class="contact-section site-container process-section">
      <div class="contact-heading centered"><p class="contact-kicker">{{ text.processKicker }}</p><h2>{{ text.processTitle }}</h2></div>
      <div class="contact-process"><article v-for="step in text.steps" :key="step[0]"><span>{{ step[0] }}</span><h3>{{ step[1] }}</h3><p>{{ step[2] }}</p></article></div>
    </section>

    <section class="visit-band"><div class="site-container visit-layout"><div><h2>{{ text.visitTitle }}</h2><p>{{ text.visitText }}</p></div><a href="tel:+8613710441030" class="button button-light">{{ text.visitButton }}</a></div></section>
  </main>
</template>

<style scoped>
.contact-page { overflow: hidden; }
.contact-kicker { margin: 0 0 12px; color: var(--brand); font-size: 12px; font-weight: 750; letter-spacing: .14em; }
.contact-kicker.light { color: #8dccff; }
.contact-section { padding-top: 96px; padding-bottom: 96px; }
.contact-hero { position: relative; min-height: 600px; display: flex; align-items: center; color: #fff; background: #061b2f; }
.contact-hero-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.contact-hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(3,19,35,.92), rgba(3,19,35,.62) 52%, rgba(3,19,35,.18)); }
.contact-hero-content { position: relative; z-index: 1; padding-top: 80px; padding-bottom: 80px; }
.contact-hero h1 { max-width: 760px; margin: 0 0 20px; font-size: clamp(42px, 5.8vw, 72px); line-height: 1.1; font-weight: 680; }
.contact-hero-content > p:last-child { max-width: 670px; margin: 0; color: rgba(255,255,255,.84); font-size: 18px; line-height: 1.85; }
.contact-heading { max-width: 760px; margin-bottom: 42px; }
.contact-heading h2, .brief-layout h2, .visit-band h2 { margin: 0 0 16px; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.2; font-weight: 650; }
.contact-heading > p:last-child, .contact-card p, .brief-layout > div > p:last-child, .brief-layout li p, .contact-process p, .visit-band p { color: var(--muted); line-height: 1.85; }
.contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.contact-card { min-width: 0; min-height: 245px; padding: 32px; background: var(--soft); border: 1px solid var(--line); }
.contact-card > span, .wechat-card span { color: var(--brand); font-size: 12px; font-weight: 700; }
.contact-card h3 { margin: 28px 0 12px; font-size: 22px; }
.contact-card a, .contact-card strong { display: block; color: var(--ink); font-size: clamp(18px, 2.2vw, 25px); line-height: 1.45; font-weight: 650; text-decoration: none; overflow-wrap: anywhere; }
.contact-card a:hover { color: var(--brand); }
.contact-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 9px; }
.contact-actions .whatsapp-action { display: inline-flex; align-items: center; gap: 8px; color: #197a4b; font-size: 15px; font-weight: 700; }
.contact-actions .whatsapp-action span { width: 22px; height: 22px; display: grid; place-items: center; color: #fff; background: #20a867; border-radius: 50%; font-size: 12px; }
.contact-actions .whatsapp-action:hover { color: #105f39; }
.contact-card p { margin: 12px 0 0; }
.wechat-card { grid-column: 1 / -1; min-height: 220px; display: flex; align-items: center; justify-content: space-between; gap: 30px; background: #fff; }
.wechat-card h3 { margin-top: 28px; }
.wechat-card img { width: 170px; height: 170px; flex: 0 0 auto; object-fit: contain; background: #fff; }
.brief-section { padding: 100px 0; color: #fff; background: #142d42; }
.brief-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 100px; }
.brief-layout > div > p:last-child { color: #b7c6d2; }
.brief-layout ul { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,.18); }
.brief-layout li { padding: 21px 0; display: grid; grid-template-columns: 54px 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,.18); }
.brief-layout li > span { color: #7fc4fb; font-size: 12px; }
.brief-layout li strong { display: block; margin-bottom: 5px; font-size: 17px; }
.brief-layout li p { margin: 0; color: #aebdca; }
.centered { margin-left: auto; margin-right: auto; text-align: center; }
.contact-process { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.contact-process article { padding: 34px 34px 16px 0; }
.contact-process article + article { padding-left: 34px; border-left: 1px solid var(--line); }
.contact-process span { color: var(--brand); font-size: 12px; font-weight: 700; }
.contact-process h3 { margin: 18px 0 9px; font-size: 21px; }
.contact-process p { margin: 0; }
.visit-band { padding: 66px 0; color: #fff; background: var(--brand); }
.visit-layout { display: flex; align-items: center; justify-content: space-between; gap: 48px; }
.visit-band h2 { margin-bottom: 10px; font-size: clamp(28px, 3vw, 40px); }
.visit-band p { max-width: 760px; margin: 0; color: rgba(255,255,255,.82); }
.visit-band .button { flex: 0 0 auto; }
@media (max-width: 900px) { .brief-layout { grid-template-columns: 1fr; gap: 42px; } .wechat-card img { width: 145px; height: 145px; } }
@media (max-width: 680px) {
  .contact-section { padding-top: 68px; padding-bottom: 68px; }
  .contact-hero { min-height: 610px; align-items: flex-end; }
  .contact-hero-shade { background: linear-gradient(0deg, rgba(3,19,35,.94), rgba(3,19,35,.58) 70%, rgba(3,19,35,.14)); }
  .contact-hero-content { padding-top: 130px; padding-bottom: 62px; }
  .contact-hero h1 { font-size: 42px; }
  .contact-hero-content > p:last-child { font-size: 16px; }
  .contact-grid { grid-template-columns: 1fr; }
  .contact-card { min-height: 0; padding: 26px; }
  .wechat-card { grid-column: auto; align-items: flex-start; flex-direction: column; }
  .wechat-card img { width: 160px; height: 160px; }
  .brief-section { padding: 72px 0; }
  .contact-process { grid-template-columns: 1fr; }
  .contact-process article, .contact-process article + article { padding: 26px 0; border-left: 0; border-bottom: 1px solid var(--line); }
  .visit-layout { align-items: stretch; flex-direction: column; gap: 28px; }
}
</style>
