<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const copy = {
  'zh-cn': {
    metaTitle: '社会责任 | 九酷游乐科技',
    metaDescription: '了解九酷游乐在绿色运营、产品责任、员工成长、社区共益与诚信治理方面的责任行动。',
    eyebrow: 'RESPONSIBILITY',
    title: '让快乐，更可持续',
    heroText: '我们把安全、环保与长期价值纳入产品研发、生产交付和运营服务，让每一次娱乐体验都建立在可靠与信任之上。',
    explore: '了解责任重点',
    statementKicker: 'OUR APPROACH',
    statementTitle: '以技术创造快乐，也以责任守护快乐',
    statementText: '九酷相信，企业的成长应当与用户体验、员工发展、合作伙伴和自然环境同向而行。我们从自身能够影响的环节出发，把责任要求落实到产品全生命周期，并通过持续沟通和改进，创造更稳健的长期价值。',
    principles: ['融入日常经营', '关注真实影响', '坚持长期改进'],
    pillarsKicker: 'ESG FRAMEWORK',
    pillarsTitle: '三条责任主线',
    pillarsLead: '围绕环境、社会与治理建立清晰的行动框架，让责任不止于承诺。',
    pillars: [
      { mark: 'E', title: '环境友好', subtitle: '绿色运营', text: '关注设备能效、材料选择、包装减量和部件循环利用，持续降低研发、生产与交付过程对环境的影响。', tags: ['节能设计', '包装优化', '循环利用'] },
      { mark: 'S', title: '以人为本', subtitle: '共同成长', text: '把产品安全、用户体验、员工发展与社区参与放在重要位置，让技术和服务惠及更多人。', tags: ['安全品质', '员工发展', '社区共益'] },
      { mark: 'G', title: '诚信治理', subtitle: '稳健经营', text: '坚持守法合规、商业诚信、数据保护与负责任采购，与合作伙伴建立透明、可靠的长期关系。', tags: ['诚信合规', '隐私保护', '伙伴责任'] }
    ],
    focusKicker: 'OUR FOCUS',
    focusTitle: '把责任落实到每一个环节',
    focusLead: '从一台设备的设计开始，延伸到制造、交付、运营和回收，让每个环节都有可持续改进的空间。',
    focus: [
      { no: '01', title: '安全与品质', text: '从结构、电气、材料和交互体验等维度审视产品风险，完善质量检查与问题追踪，守护用户与运营人员的安全。' },
      { no: '02', title: '绿色产品与运营', text: '探索低功耗方案、耐用设计和可维护结构，优化包装与运输，让设备在更长使用周期内保持稳定价值。' },
      { no: '03', title: '员工成长与关怀', text: '营造尊重、多元和安全的工作环境，通过岗位学习、技能提升与团队协作，支持员工与企业共同成长。' },
      { no: '04', title: '伙伴与社区共益', text: '坚持公平合作和负责任采购，鼓励团队结合专业能力参与社区服务，让小而持续的行动产生积极影响。' }
    ],
    productKicker: 'RESPONSIBLE PRODUCT',
    productTitle: '从产品全生命周期出发',
    productText: '责任不只发生在出厂之前。九酷将设计、制造、交付、运营维护与后续处置视为一个完整过程，在保障体验的同时，努力提升资源效率与设备耐用性。',
    lifecycle: [
      ['设计', '兼顾安全、能效、可维护性与易用性'],
      ['制造', '关注质量控制、材料使用与生产环境'],
      ['交付', '优化包装、运输与现场安装方案'],
      ['运营', '通过数字化能力支持状态管理和及时维护'],
      ['延续', '推动部件维修、再利用与规范处置']
    ],
    pathKicker: 'CONTINUOUS IMPROVEMENT',
    pathTitle: '用持续改进兑现长期承诺',
    pathText: '社会责任是一项长期工作。我们将从识别重点议题开始，逐步建立目标、行动、复盘与沟通机制，让每一次改进都可感知、可延续。',
    path: [
      ['识别', '倾听用户、员工与合作伙伴的关注'],
      ['行动', '将重点议题纳入产品和经营流程'],
      ['复盘', '跟踪问题与改进事项的完成情况'],
      ['沟通', '分享进展，也坦诚面对不足']
    ],
    ctaTitle: '一起创造负责任的快乐体验',
    ctaText: '如果您对九酷的产品责任、绿色合作或社区共益有建议，欢迎与我们联系。',
    ctaButton: '联系我们'
  },
  'zh-tw': {
    metaTitle: '社會責任 | 九酷遊樂科技',
    metaDescription: '了解九酷遊樂在綠色營運、產品責任、員工成長、社區共益與誠信治理方面的責任行動。',
    eyebrow: 'RESPONSIBILITY',
    title: '讓快樂，更可持續',
    heroText: '我們把安全、環保與長期價值納入產品研發、生產交付和營運服務，讓每一次娛樂體驗都建立在可靠與信任之上。',
    explore: '了解責任重點',
    statementKicker: 'OUR APPROACH',
    statementTitle: '以技術創造快樂，也以責任守護快樂',
    statementText: '九酷相信，企業的成長應當與用戶體驗、員工發展、合作夥伴和自然環境同向而行。我們從自身能夠影響的環節出發，把責任要求落實到產品全生命週期，並透過持續溝通和改進，創造更穩健的長期價值。',
    principles: ['融入日常經營', '關注真實影響', '堅持長期改進'],
    pillarsKicker: 'ESG FRAMEWORK', pillarsTitle: '三條責任主線', pillarsLead: '圍繞環境、社會與治理建立清晰的行動框架，讓責任不止於承諾。',
    pillars: [
      { mark: 'E', title: '環境友好', subtitle: '綠色營運', text: '關注設備能效、材料選擇、包裝減量和部件循環利用，持續降低研發、生產與交付過程對環境的影響。', tags: ['節能設計', '包裝優化', '循環利用'] },
      { mark: 'S', title: '以人為本', subtitle: '共同成長', text: '把產品安全、用戶體驗、員工發展與社區參與放在重要位置，讓技術和服務惠及更多人。', tags: ['安全品質', '員工發展', '社區共益'] },
      { mark: 'G', title: '誠信治理', subtitle: '穩健經營', text: '堅持守法合規、商業誠信、資料保護與負責任採購，與合作夥伴建立透明、可靠的長期關係。', tags: ['誠信合規', '隱私保護', '夥伴責任'] }
    ],
    focusKicker: 'OUR FOCUS', focusTitle: '把責任落實到每一個環節', focusLead: '從一台設備的設計開始，延伸到製造、交付、營運和回收，讓每個環節都有可持續改進的空間。',
    focus: [
      { no: '01', title: '安全與品質', text: '從結構、電氣、材料和互動體驗等維度審視產品風險，完善品質檢查與問題追蹤，守護用戶與營運人員的安全。' },
      { no: '02', title: '綠色產品與營運', text: '探索低功耗方案、耐用設計和可維護結構，優化包裝與運輸，讓設備在更長使用週期內保持穩定價值。' },
      { no: '03', title: '員工成長與關懷', text: '營造尊重、多元和安全的工作環境，透過崗位學習、技能提升與團隊協作，支持員工與企業共同成長。' },
      { no: '04', title: '夥伴與社區共益', text: '堅持公平合作和負責任採購，鼓勵團隊結合專業能力參與社區服務，讓小而持續的行動產生積極影響。' }
    ],
    productKicker: 'RESPONSIBLE PRODUCT', productTitle: '從產品全生命週期出發', productText: '責任不只發生在出廠之前。九酷將設計、製造、交付、營運維護與後續處置視為一個完整過程，在保障體驗的同時，努力提升資源效率與設備耐用性。',
    lifecycle: [['設計', '兼顧安全、能效、可維護性與易用性'], ['製造', '關注品質控制、材料使用與生產環境'], ['交付', '優化包裝、運輸與現場安裝方案'], ['營運', '透過數位化能力支持狀態管理和及時維護'], ['延續', '推動部件維修、再利用與規範處置']],
    pathKicker: 'CONTINUOUS IMPROVEMENT', pathTitle: '用持續改進兌現長期承諾', pathText: '社會責任是一項長期工作。我們將從識別重點議題開始，逐步建立目標、行動、複盤與溝通機制，讓每一次改進都可感知、可延續。',
    path: [['識別', '傾聽用戶、員工與合作夥伴的關注'], ['行動', '將重點議題納入產品和經營流程'], ['複盤', '追蹤問題與改進事項的完成情況'], ['溝通', '分享進展，也坦誠面對不足']],
    ctaTitle: '一起創造負責任的快樂體驗', ctaText: '如果您對九酷的產品責任、綠色合作或社區共益有建議，歡迎與我們聯絡。', ctaButton: '聯絡我們'
  },
  'en-us': {
    metaTitle: 'Responsibility | JiuKu Amusement Technology',
    metaDescription: 'Explore JiuKu’s approach to greener operations, responsible products, people, community and ethical governance.',
    eyebrow: 'RESPONSIBILITY', title: 'Making fun more sustainable',
    heroText: 'We bring safety, environmental awareness and long-term value into product development, delivery and operations—so every experience is built on reliability and trust.',
    explore: 'Explore our priorities', statementKicker: 'OUR APPROACH', statementTitle: 'Technology creates fun. Responsibility protects it.',
    statementText: 'We believe business growth should move in step with better user experiences, employee development, trusted partnerships and a healthier environment. We start with the areas we can influence, apply responsibility across the product lifecycle and keep improving through open dialogue.',
    principles: ['Built into operations', 'Focused on real impact', 'Committed to progress'],
    pillarsKicker: 'ESG FRAMEWORK', pillarsTitle: 'Three responsibility pillars', pillarsLead: 'A clear environmental, social and governance framework turns intent into everyday action.',
    pillars: [
      { mark: 'E', title: 'Environment', subtitle: 'Greener operations', text: 'We consider energy efficiency, material choices, reduced packaging and component reuse across development, production and delivery.', tags: ['Energy-aware design', 'Smarter packaging', 'Reuse'] },
      { mark: 'S', title: 'People', subtitle: 'Growing together', text: 'We prioritize product safety, user experience, employee development and community participation so technology can benefit more people.', tags: ['Safety & quality', 'People development', 'Community'] },
      { mark: 'G', title: 'Governance', subtitle: 'Responsible business', text: 'We value compliance, business integrity, data protection and responsible sourcing in transparent, long-term partnerships.', tags: ['Integrity', 'Privacy', 'Responsible sourcing'] }
    ],
    focusKicker: 'OUR FOCUS', focusTitle: 'Responsibility at every step', focusLead: 'From the first design decision through manufacturing, delivery, operation and end-of-use, every stage offers room to improve.',
    focus: [
      { no: '01', title: 'Safety and quality', text: 'We review structural, electrical, material and interaction risks, and strengthen quality checks and issue tracking for users and operators.' },
      { no: '02', title: 'Greener products and operations', text: 'We explore lower-power solutions, durable design, serviceable structures and more efficient packaging and transport.' },
      { no: '03', title: 'Employee growth and care', text: 'We work to create a respectful, inclusive and safe workplace, supported by on-the-job learning, skills development and teamwork.' },
      { no: '04', title: 'Partners and communities', text: 'We support fair cooperation and responsible sourcing, and encourage practical community contributions connected to our expertise.' }
    ],
    productKicker: 'RESPONSIBLE PRODUCT', productTitle: 'Thinking across the product lifecycle', productText: 'Responsibility does not end at the factory door. We view design, manufacturing, delivery, maintenance and end-of-use as one connected process—improving resource efficiency while protecting the experience.',
    lifecycle: [['Design', 'Balance safety, energy use, serviceability and ease of use'], ['Manufacture', 'Focus on quality control, materials and the production environment'], ['Deliver', 'Improve packaging, transport and on-site installation'], ['Operate', 'Use digital tools to support status management and timely service'], ['Extend', 'Encourage repair, component reuse and responsible disposal']],
    pathKicker: 'CONTINUOUS IMPROVEMENT', pathTitle: 'Progress that supports long-term commitments', pathText: 'Responsibility is ongoing. We are building a practical cycle of identifying priorities, acting, reviewing progress and communicating openly—so each improvement can carry forward.',
    path: [['Listen', 'Understand priorities across users, employees and partners'], ['Act', 'Embed material topics in products and operations'], ['Review', 'Track issues and improvement actions'], ['Share', 'Communicate progress and acknowledge gaps']],
    ctaTitle: 'Let’s create responsible experiences together', ctaText: 'Have a suggestion about product responsibility, greener collaboration or community impact? We would like to hear from you.', ctaButton: 'Contact us'
  }
} as const

const lang = computed(() => (locale.value in copy ? locale.value : 'zh-cn') as keyof typeof copy)
const text = computed(() => copy[lang.value])
const pillarIcon = (mark: string): 'environment' | 'people' | 'governance' => {
  if (mark === 'E') return 'environment'
  if (mark === 'S') return 'people'
  return 'governance'
}

useHead(() => ({
  title: text.value.metaTitle,
  meta: [{ name: 'description', content: text.value.metaDescription }]
}))
</script>

<template>
  <main class="csr-page">
    <section class="csr-hero">
      <img src="/images/csr.jpg" :alt="text.title" class="csr-hero-image">
      <div class="csr-hero-overlay"></div>
      <div class="site-container csr-hero-content">
        <p class="csr-kicker light">{{ text.eyebrow }}</p>
        <h1>{{ text.title }}</h1>
        <p>{{ text.heroText }}</p>
        <a href="#responsibility-pillars" class="button button-light">{{ text.explore }}</a>
      </div>
    </section>

    <section class="csr-section site-container csr-intro">
      <div>
        <p class="csr-kicker">{{ text.statementKicker }}</p>
        <h2>{{ text.statementTitle }}</h2>
      </div>
      <div>
        <p class="intro-copy">{{ text.statementText }}</p>
        <ul class="principle-list">
          <li v-for="(principle, index) in text.principles" :key="principle"><span>0{{ index + 1 }}</span>{{ principle }}</li>
        </ul>
      </div>
    </section>

    <section id="responsibility-pillars" class="csr-section pillars-section">
      <div class="site-container">
        <div class="csr-heading">
          <p class="csr-kicker">{{ text.pillarsKicker }}</p>
          <h2>{{ text.pillarsTitle }}</h2>
          <p>{{ text.pillarsLead }}</p>
        </div>
        <div class="pillar-grid">
          <article v-for="pillar in text.pillars" :key="pillar.mark" class="pillar-card">
            <div class="pillar-top"><span class="pillar-symbol"><SemanticIcon :name="pillarIcon(pillar.mark)" /></span><span>{{ pillar.subtitle }}</span></div>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.text }}</p>
            <ul><li v-for="tag in pillar.tags" :key="tag">{{ tag }}</li></ul>
          </article>
        </div>
      </div>
    </section>

    <section class="csr-section site-container">
      <div class="csr-heading split-heading">
        <div><p class="csr-kicker">{{ text.focusKicker }}</p><h2>{{ text.focusTitle }}</h2></div>
        <p>{{ text.focusLead }}</p>
      </div>
      <div class="focus-grid">
        <article v-for="item in text.focus" :key="item.no" class="focus-card">
          <span>{{ item.no }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="lifecycle-section">
      <div class="site-container lifecycle-layout">
        <div class="lifecycle-copy">
          <p class="csr-kicker light">{{ text.productKicker }}</p>
          <h2>{{ text.productTitle }}</h2>
          <p>{{ text.productText }}</p>
        </div>
        <ol class="lifecycle-list">
          <li v-for="(item, index) in text.lifecycle" :key="item[0]">
            <span>0{{ index + 1 }}</span><div><strong>{{ item[0] }}</strong><p>{{ item[1] }}</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section class="csr-section site-container improvement-section">
      <div class="csr-heading centered">
        <p class="csr-kicker">{{ text.pathKicker }}</p><h2>{{ text.pathTitle }}</h2><p>{{ text.pathText }}</p>
      </div>
      <div class="path-grid">
        <article v-for="(item, index) in text.path" :key="item[0]">
          <span>0{{ index + 1 }}</span><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="csr-cta">
      <div class="site-container csr-cta-layout">
        <div><h2>{{ text.ctaTitle }}</h2><p>{{ text.ctaText }}</p></div>
        <NuxtLink :to="localePath('/contact')" class="button button-light">{{ text.ctaButton }}</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.csr-page { overflow: hidden; }
.csr-kicker { margin: 0 0 12px; color: var(--brand); font-size: 12px; font-weight: 750; letter-spacing: .14em; }
.csr-kicker.light { color: #94d0ff; }
.csr-section { padding-top: 96px; padding-bottom: 96px; }
.csr-heading { max-width: 760px; margin-bottom: 42px; }
.csr-heading h2, .csr-intro h2, .lifecycle-copy h2, .csr-cta h2 { margin: 0 0 16px; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.2; font-weight: 650; }
.csr-heading > p:last-child, .intro-copy, .focus-card p, .lifecycle-copy > p:last-child, .path-grid p, .csr-cta p { color: var(--muted); line-height: 1.85; }
.csr-hero { position: relative; min-height: 610px; display: flex; align-items: center; color: #fff; background: #17324b; }
.csr-hero-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 54%; }
.csr-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,31,44,.9), rgba(8,31,44,.64) 48%, rgba(8,31,44,.14)); }
.csr-hero-content { position: relative; z-index: 1; padding-top: 80px; padding-bottom: 80px; }
.csr-hero h1 { max-width: 720px; margin: 0 0 20px; font-size: clamp(44px, 6vw, 76px); line-height: 1.08; font-weight: 680; }
.csr-hero-content > p:not(.csr-kicker) { max-width: 680px; margin: 0 0 30px; color: rgba(255,255,255,.86); font-size: 18px; line-height: 1.85; }
.csr-intro { display: grid; grid-template-columns: .8fr 1.2fr; gap: 100px; }
.intro-copy { margin: 2px 0 32px; font-size: 17px; }
.principle-list { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); list-style: none; border-top: 1px solid var(--line); }
.principle-list li { padding: 20px 12px 0 0; display: flex; flex-direction: column; gap: 12px; font-weight: 650; }
.principle-list span { color: var(--brand); font-size: 12px; }
.pillars-section { background: var(--soft); }
.pillar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.pillar-card { position: relative; min-width: 0; overflow: hidden; padding: 34px; background: #fff; border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 14px 34px rgba(31,51,75,.06); }
.pillar-card::before { content: ''; position: absolute; inset: 0 0 auto; height: 4px; background: var(--brand); }
.pillar-card:nth-child(1)::before { background: #26a477; }
.pillar-card:nth-child(2)::before { background: #e3943d; }
.pillar-top { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 13px; }
.pillar-symbol { width: 62px; height: 62px; padding: 8px; display: grid; place-items: center; color: var(--brand); background: linear-gradient(145deg, #f7fbff, #e4f1fd); border: 1px solid #cfe3f5; border-radius: 18px; }
.pillar-card:nth-child(1) .pillar-symbol { color: #16815d; background: linear-gradient(145deg, #f5fcf9, #e1f5ed); border-color: #c5e8da; }
.pillar-card:nth-child(2) .pillar-symbol { color: #b96d1e; background: linear-gradient(145deg, #fffaf4, #fbeddb); border-color: #f1dcc2; }
.pillar-card h3 { margin: 30px 0 14px; font-size: 25px; }
.pillar-card > p { min-height: 108px; margin: 0; color: var(--muted); line-height: 1.8; }
.pillar-card ul { margin: 28px 0 0; padding: 20px 0 0; display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid var(--line); list-style: none; }
.pillar-card li { padding: 6px 10px; color: var(--brand-dark); background: #eef6fd; font-size: 12px; }
.split-heading { max-width: none; display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: end; }
.split-heading h2 { margin-bottom: 0; }
.focus-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); }
.focus-card { padding: 34px 50px 38px 0; border-bottom: 1px solid var(--line); }
.focus-card:nth-child(even) { padding-left: 50px; border-left: 1px solid var(--line); }
.focus-card > span { color: var(--brand); font-size: 12px; font-weight: 700; }
.focus-card h3 { margin: 16px 0 10px; font-size: 22px; }
.focus-card p { margin: 0; }
.lifecycle-section { padding: 98px 0; color: #fff; background: #132d42; }
.lifecycle-layout { display: grid; grid-template-columns: .85fr 1.15fr; gap: 100px; align-items: start; }
.lifecycle-copy > p:last-child { color: #b8c7d3; }
.lifecycle-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,.18); }
.lifecycle-list li { padding: 20px 0; display: grid; grid-template-columns: 54px 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,.18); }
.lifecycle-list li > span { color: #7cc2ff; font-size: 12px; }
.lifecycle-list strong { display: block; margin-bottom: 6px; font-size: 17px; }
.lifecycle-list p { margin: 0; color: #aebfcd; line-height: 1.65; }
.improvement-section { padding-bottom: 110px; }
.centered { margin-left: auto; margin-right: auto; text-align: center; }
.path-grid { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; }
.path-grid::before { content: ''; position: absolute; top: 18px; left: 12.5%; right: 12.5%; height: 1px; background: #dbe3ea; }
.path-grid article { position: relative; padding: 0 22px; text-align: center; }
.path-grid span { position: relative; z-index: 1; width: 38px; height: 38px; margin: 0 auto 22px; display: grid; place-items: center; color: #fff; background: var(--brand); border-radius: 50%; font-size: 11px; }
.path-grid h3 { margin: 0 0 10px; font-size: 19px; }
.path-grid p { margin: 0; font-size: 14px; }
.csr-cta { padding: 66px 0; color: #fff; background: var(--brand); }
.csr-cta-layout { display: flex; align-items: center; justify-content: space-between; gap: 48px; }
.csr-cta h2 { margin: 0 0 10px; font-size: clamp(28px, 3vw, 40px); }
.csr-cta p { max-width: 740px; margin: 0; color: rgba(255,255,255,.82); }
.csr-cta .button { flex: 0 0 auto; }
@media (max-width: 900px) {
  .csr-intro, .lifecycle-layout { grid-template-columns: 1fr; gap: 42px; }
  .pillar-grid { grid-template-columns: 1fr; }
  .pillar-card > p { min-height: 0; }
  .split-heading { grid-template-columns: 1fr; gap: 12px; }
}
@media (max-width: 680px) {
  .csr-section { padding-top: 68px; padding-bottom: 68px; }
  .csr-hero { min-height: 620px; align-items: flex-end; }
  .csr-hero-overlay { background: linear-gradient(0deg, rgba(8,31,44,.94), rgba(8,31,44,.58) 70%, rgba(8,31,44,.18)); }
  .csr-hero-content { padding-top: 130px; padding-bottom: 62px; }
  .csr-hero h1 { font-size: 44px; }
  .csr-hero-content > p:not(.csr-kicker) { font-size: 16px; }
  .principle-list { grid-template-columns: 1fr; }
  .principle-list li { padding: 16px 0; flex-direction: row; border-bottom: 1px solid var(--line); }
  .pillar-card { padding: 26px; }
  .focus-grid { grid-template-columns: 1fr; }
  .focus-card, .focus-card:nth-child(even) { padding: 26px 0; border-left: 0; }
  .lifecycle-section { padding: 72px 0; }
  .path-grid { grid-template-columns: 1fr; gap: 0; }
  .path-grid::before { top: 0; bottom: 0; left: 18px; right: auto; width: 1px; height: auto; }
  .path-grid article { padding: 0 0 28px 58px; text-align: left; }
  .path-grid span { position: absolute; left: 0; top: 0; margin: 0; }
  .csr-cta-layout { align-items: stretch; flex-direction: column; gap: 28px; }
}
</style>
