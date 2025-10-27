<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: { Header, Footer }
}
</script>

<style>
.container { max-width: 1100px; margin: 0 auto; padding: 20px; }
</style>