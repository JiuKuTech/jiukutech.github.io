<script setup lang="ts">
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const links = computed(() => [
  { to: localePath('/'), label: locale.value === 'en-us' ? 'Home' : locale.value === 'zh-tw' ? '首頁' : '首页' },
  { to: localePath('/services'), label: locale.value === 'en-us' ? 'Products & Services' : locale.value === 'zh-tw' ? '產品與服務' : '产品与服务' },
  { to: localePath('/csr'), label: locale.value === 'en-us' ? 'Responsibility' : locale.value === 'zh-tw' ? '社會責任' : '社会责任' },
  { to: localePath('/about'), label: locale.value === 'en-us' ? 'About' : locale.value === 'zh-tw' ? '關於九酷' : '关于九酷' },
  { to: localePath('/contact'), label: locale.value === 'en-us' ? 'Contact' : locale.value === 'zh-tw' ? '聯絡我們' : '联系我们' }
])

const onScroll = () => { scrolled.value = window.scrollY > 12 }
const changeLocale = async (code: 'zh-cn' | 'zh-tw' | 'en-us') => {
  menuOpen.value = false
  await setLocale(code)
}

watch(() => route.fullPath, () => { menuOpen.value = false })
watch(menuOpen, value => {
  if (import.meta.client) document.body.classList.toggle('menu-open', value)
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <header class="site-header" :class="{ scrolled, open: menuOpen }">
    <div class="site-container header-inner">
      <NuxtLink :to="localePath('/')" class="logo-link" :aria-label="locale === 'en-us' ? 'JiuKu home' : '九酷首页'">
        <img src="~/assets/logo/colorful.png" :alt="locale === 'en-us' ? 'JiuKu Amusement' : '九酷游乐'">
      </NuxtLink>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" :aria-label="locale === 'en-us' ? 'Open navigation' : '打开导航'" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" :aria-label="locale === 'en-us' ? 'Primary navigation' : '主导航'">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
        <div class="lang-picker" :aria-label="locale === 'en-us' ? 'Language selection' : '语言选择'">
          <button :class="{ active: locale === 'zh-cn' }" @click="changeLocale('zh-cn')">简</button><span>/</span>
          <button :class="{ active: locale === 'zh-tw' }" @click="changeLocale('zh-tw')">繁</button><span>/</span>
          <button :class="{ active: locale === 'en-us' }" @click="changeLocale('en-us')">EN</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header { position: fixed; inset: 0 0 auto; z-index: 1000; height: 68px; background: rgba(255,255,255,.98); border-bottom: 1px solid rgba(20,29,45,.08); transition: box-shadow .2s ease, background .2s ease; }
.site-header.scrolled { background: rgba(255,255,255,.9); backdrop-filter: blur(12px); box-shadow: 0 8px 24px rgba(18,34,59,.08); }
.header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
.logo-link, .logo-link img { display: block; }
.logo-link img { width: auto; height: 42px; }
.main-nav { display: flex; align-items: center; gap: 28px; height: 100%; }
.main-nav :deep(a) { position: relative; color: #202834; font-size: 14px; text-decoration: none; white-space: nowrap; }
.main-nav :deep(a::after) { content: ''; position: absolute; left: 0; right: 100%; bottom: -10px; height: 2px; background: #1477d4; transition: right .2s ease; }
.main-nav :deep(a:hover), .main-nav :deep(a.router-link-active) { color: #1477d4; }
.main-nav :deep(a:hover::after), .main-nav :deep(a.router-link-active::after) { right: 0; }
.lang-picker { display: flex; align-items: center; gap: 7px; margin-left: 4px; color: #c2c8d0; }
.lang-picker button { padding: 4px 0; border: 0; background: transparent; color: #66717f; font-size: 13px; }
.lang-picker button.active { color: #1477d4; font-weight: 700; }
.menu-toggle { display: none; width: 40px; height: 40px; padding: 9px; background: transparent; border: 0; }
.menu-toggle span { display: block; width: 22px; height: 2px; margin: 5px 0; background: #202834; transition: transform .2s ease, opacity .2s ease; }
@media (max-width: 860px) {
  .site-header { height: 60px; }
  .logo-link img { height: 36px; }
  .menu-toggle { display: block; }
  .open .menu-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .open .menu-toggle span:nth-child(2) { opacity: 0; }
  .open .menu-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .main-nav { position: absolute; top: 60px; left: 0; right: 0; height: auto; padding: 18px 20px 24px; background: #fff; border-top: 1px solid #edf0f4; box-shadow: 0 18px 30px rgba(18,34,59,.12); flex-direction: column; align-items: stretch; gap: 0; transform: translateY(-10px); opacity: 0; visibility: hidden; transition: .2s ease; }
  .open .main-nav { transform: translateY(0); opacity: 1; visibility: visible; }
  .main-nav :deep(a) { padding: 13px 2px; font-size: 16px; border-bottom: 1px solid #edf0f4; }
  .main-nav :deep(a::after) { display: none; }
  .lang-picker { margin: 14px 0 0; gap: 12px; }
  .lang-picker button { font-size: 14px; }
}
</style>
