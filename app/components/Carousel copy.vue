<template>
  <section v-if="slides && slides.length" class="carousel">
    <div class="slide" v-for="(s, i) in slides" :key="i" :class="{active: i===index}">
      <img :src="s.image" :alt="s.title" />
      <div class="caption">
        <h3>{{ s.title }}</h3>
        <p v-html="s.content"></p>
      </div>
    </div>

    <div class="controls">
      <button @click="prev">‹</button>
      <button @click="next">›</button>
    </div>

    <div class="dots">
      <button v-for="(s,i) in slides" :key="i" :class="{on: i===index}" @click="go(i)"></button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Carousel',
  setup() {
    const slides = ref(null)
    const index = ref(0)
    let timer = null

    async function load() {
      try {
        // 读取配置文件（若不存在或为空则不显示）
        const res = await fetch('/carousel/config.json')
        if (!res.ok) return
        const cfg = await res.json()
        if (!Array.isArray(cfg) || cfg.length === 0) return

        // 加载同目录图片（通过 Vite 的相对路径获取 URL）
        const imgs = import.meta.glob('/carousel/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' })
        const map = {}
        Object.keys(imgs).forEach(k => {
          const name = k.split('/').pop()
          map[name] = imgs[k]
        })

        slides.value = cfg.map(item => {
          const image = map[item.filename] || ''
          return { ...item, image }
        }).filter(s => s.image)
      } catch (e) {
        console.warn('carousel load error', e)
      }
    }

    function next() {
      if (!slides.value || !slides.value.length) return
      index.value = (index.value + 1) % slides.value.length
    }
    function prev() {
      if (!slides.value || !slides.value.length) return
      index.value = (index.value - 1 + slides.value.length) % slides.value.length
    }
    function go(i) { index.value = i }

    onMounted(async () => {
      await load()
      if (slides.value && slides.value.length) {
        timer = setInterval(next, 4000)
      }
    })
    onUnmounted(() => { if (timer) clearInterval(timer) })

    return { slides, index, next, prev, go }
  }
}
</script>

<style scoped>
.carousel { margin: 24px 0; position:relative; overflow:hidden; border-radius:8px; }
.slide { display:none; padding:16px; align-items:center; gap:16px; }
.slide.active { display:flex; background:#fff; }
.slide img { width:220px; height:140px; object-fit:cover; border-radius:6px; flex:0 0 auto; }
.caption { padding:8px 12px; }
.controls { position:absolute; top:50%; left:0; right:0; display:flex; justify-content:space-between; transform:translateY(-50%); pointer-events:none; }
.controls button { pointer-events:auto; background:rgba(0,0,0,0.45); color:#fff; border:none; padding:8px 12px; border-radius:4px; margin:0 10px; cursor:pointer; }
.dots { text-align:center; margin-top:8px; }
.dots button { width:10px; height:10px; border-radius:50%; margin:0 4px; border:none; background:#ddd; cursor:pointer; }
.dots button.on { background:#0d6efd; }
</style>
