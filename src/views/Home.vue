<template>
  <section class="hero">
    <h2>专业的解决方案，驱动您的业务增长</h2>
    <p>我们提供高质量的产品与服务，帮助企业在数字化时代取得成功。</p>
    <router-link to="/contact" class="btn">联系我们</router-link>
  </section>

  <section class="features">
    <h3>我们的服务</h3>
    <ul>
      <li>定制开发</li>
      <li>产品设计</li>
      <li>技术支持</li>
    </ul>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.hero { padding:40px 0; text-align:center; background:linear-gradient(90deg,#f0f8ff,#fff); }
.btn { display:inline-block; margin-top:12px; padding:10px 16px; background:#0d6efd;color:#fff;border-radius:4px;text-decoration:none; }
.features { margin-top:30px; }
</style>