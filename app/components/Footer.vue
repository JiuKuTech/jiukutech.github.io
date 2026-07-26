<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const socialConfig = ref<Record<string, { icon: string, url: string }>>({})
const text = computed(() => locale.value === 'en-us' ? {
  intro: 'Amusement equipment, venue management and custom software for businesses worldwide.', contact: 'Contact', phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', companyAddress: 'Company: Room 102, Building A, Huoli Animation Technology Park, Panyu District, Guangzhou, Guangdong, China', factoryAddress: 'Factory: Room 421, Building B, Huoli Animation Technology Park, Panyu District, Guangzhou, Guangdong, China', follow: 'Follow us', rights: 'All rights reserved.'
} : locale.value === 'zh-tw' ? {
  intro: '提供遊樂設備、場地管理系統、定制軟體與場景解決方案。', contact: '聯絡方式', phone: '電話', whatsapp: 'WhatsApp', email: '郵箱', companyAddress: '公司：廣東省廣州市番禺區活力動漫科技園 A 座 102', factoryAddress: '工廠：廣東省廣州市番禺區活力動漫科技園 B 座 421', follow: '關注我們', rights: '保留所有權利。'
} : {
  intro: '提供游乐设备、场地管理系统、定制软件与场景解决方案。', contact: '联系方式', phone: '电话', whatsapp: 'WhatsApp', email: '邮箱', companyAddress: '公司：广东省广州市番禺区活力动漫科技园 A 座 102', factoryAddress: '工厂：广东省广州市番禺区活力动漫科技园 B 座 421', follow: '关注我们', rights: '保留所有权利。'
})
onMounted(async () => {
  try { socialConfig.value = await $fetch('/follow/config.json') } catch { socialConfig.value = {} }
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-container footer-grid">
      <div class="footer-brand"><NuxtLink :to="localePath('/')"><img src="~/assets/logo/colorful.png" :alt="locale === 'en-us' ? 'JiuKu Amusement' : '九酷游乐'"></NuxtLink><p>{{ text.intro }}</p></div>
      <div class="footer-contact"><h2>{{ text.contact }}</h2><a href="tel:+8613710441030">{{ text.phone }}：+86 137 1044 1030</a><a href="https://wa.me/8613710441030" target="_blank" rel="noopener noreferrer">{{ text.whatsapp }}：+86 137 1044 1030</a><a href="mailto:82096004@qq.com">{{ text.email }}：82096004@qq.com</a><p>{{ text.companyAddress }}</p><p>{{ text.factoryAddress }}</p></div>
      <div class="footer-social"><h2>{{ text.follow }}</h2><div><a v-for="(item, key) in socialConfig" :key="key" :href="item.url" target="_blank" rel="noopener noreferrer" :aria-label="key"><img :src="`/follow/${item.icon}`" :alt="key"></a></div></div>
    </div>
    <div class="site-container footer-bottom">Copyright © 2014 - {{ new Date().getFullYear() }} JiuKu. {{ text.rights }}</div>
  </footer>
</template>

<style scoped>
.site-footer { background: #f5f7fa; border-top: 1px solid #e7ebf0; color: #5d6875; }
.footer-grid { display: grid; grid-template-columns: 1.2fr 1.4fr .7fr; gap: 70px; padding-top: 52px; padding-bottom: 42px; }
.footer-brand img { width: 150px; height: auto; display: block; }
.footer-brand p { max-width: 330px; margin: 18px 0 0; line-height: 1.8; font-size: 14px; }
h2 { margin: 0 0 18px; color: #202834; font-size: 15px; font-weight: 700; }
.footer-contact { display: flex; flex-direction: column; align-items: flex-start; gap: 9px; font-size: 14px; }
.footer-contact a { color: #5d6875; text-decoration: none; }
.footer-contact a:hover { color: #1477d4; }
.footer-contact p { margin: 0; line-height: 1.7; }
.footer-social > div { display: flex; flex-wrap: wrap; gap: 10px; }
.footer-social a { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid #dce2e8; background: #fff; border-radius: 4px; transition: transform .2s ease, border-color .2s ease; }
.footer-social a:hover { transform: translateY(-2px); border-color: #1477d4; }
.footer-social img { width: 19px; height: 19px; }
.footer-bottom { padding-top: 18px; padding-bottom: 20px; border-top: 1px solid #e1e6eb; font-size: 12px; }
@media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr; gap: 30px; padding-top: 38px; padding-bottom: 30px; } .footer-brand img { width: 132px; } }
</style>
