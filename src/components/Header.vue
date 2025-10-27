<template>
  <header class="site-header">
    <div class="container header-inner">
      <h1 class="logo"><router-link to="/">九酷公司</router-link></h1>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于我们</router-link>
        <router-link to="/services">服务</router-link>
        <router-link to="/contact">联系</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
.site-header { background:#0d6efd; color:white; padding:10px 0; }
.header-inner { display:flex; align-items:center; justify-content:space-between; }
.logo a { color:white; text-decoration:none; font-weight:700; }
nav a { color:white; margin-left:16px; text-decoration:none; }
</style>