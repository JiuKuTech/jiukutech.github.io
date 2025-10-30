<template>
  <header
    class="site-header"
    :class="{ transparent: isTransparent, hidden: hidden }"
  >
    <div class="container header-inner">
      <h1 class="logo">
        <NuxtLink to="/">
            <img src="~/assets/logo/colorful.png" alt="九酷游乐" class="logo-img" />
        </NuxtLink>
      </h1>
      <nav>
        <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('/services')">{{ $t('services') }}</NuxtLink>
        <NuxtLink :to="localePath('/csr')">{{ $t('csr') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')">{{ $t('about') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')">{{ $t('contact') }}</NuxtLink>
        <!-- 语言选择控件（放在顶栏的最后一个） -->
        <div class="lang-picker" aria-label="语言选择">
          <button :class="{active: langState && langState.lang==='zh-cn'}" @click="setLang && setLang('zh-cn')">简</button>
          <span class="separator">/</span>
          <button :class="{active: langState && langState.lang==='zh-tw'}" @click="setLang && setLang('zh-tw')">繁</button>
          <span class="separator">/</span>
          <button :class="{active: langState && langState.lang==='en-us'}" @click="setLang && setLang('en-us')">EN</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from 'vue'

export default {
  name: 'Header',
  setup() {
    const isTransparent = ref(false)
    const hidden = ref(false)
    const localePath = useLocalePath() 
    let lastY = 0
    let ticking = false

    // 确保代码在客户端执行
    const handle = () => {
      if (typeof window !== 'undefined') {
        const y = window.scrollY || 0
        // 透明效果：下滑一点就显示模糊透明
        isTransparent.value = y > 10

        // 隐藏/显示：根据滚动方向
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (y > lastY + 10 && y > 80) {
              // 向下并超过阈值，隐藏
              hidden.value = true
            } else if (y < lastY - 10) {
              // 向上，显示
              hidden.value = false
            }
            lastY = y
            ticking = false
          })
          ticking = true
        }
      }
    }

    onMounted(() => {
      if (typeof window !== 'undefined') {
        lastY = window.scrollY || 0
        window.addEventListener('scroll', handle)
      }
    })

    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handle)
      }
    })

    // 注入由 App 提供的语言状态与设置函数
    const langState = inject('langState')
    const setLang = inject('setLang')

    return { isTransparent, hidden, langState, setLang, localePath }
  }
}
</script>


<style scoped>
.logo { margin: 0; }
.logo :deep(a) { color: #111; text-decoration: none; font-weight: 700; font-size: 18px; }

.logo :deep(img) {
  height: 40px;
  width: auto;
  display: block;
}

.site-header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  color: #222;
  padding: 8px 0;
  transition: background 200ms ease, transform 260ms ease, box-shadow 200ms ease;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}

.site-header.transparent {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.site-header.hidden {
  transform: translateY(-110%);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.logo { margin: 0; }
.logo :deep(a) { color: #111; text-decoration: none; font-weight: 700; font-size: 18px; }

nav { 
  display: flex; 
  gap: 24px; 
  align-items: center; 
}

nav :deep(a) {
  color: #111;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

nav :deep(a:hover) {
  color: #0d6efd;
}

.nav-link { 
  color: #111 !important; 
  text-decoration: none; 
  font-size: 14px; 
  transition: color 0.3s;
}

.nav-link:hover { 
  color: #0d6efd !important; 
}

.lang-picker { 
  display: flex; 
  gap: 8px; 
  align-items: center; 
}

.lang-picker button { 
  padding: 0;
  border: none;
  background: transparent;
  color: #111;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.lang-picker button:hover { 
  color: #0d6efd;
}

.lang-picker button.active { 
  color: #0d6efd;
  font-weight: 600;
}

.lang-picker .separator {
  color: #ccc;
  font-size: 14px;
  user-select: none;
}
</style>

