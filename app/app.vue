<template>
  <div>
    <Header />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
const { locale, setLocale } = useI18n()

const langState = computed(() => ({
  lang: locale.value
}))

const setLang = (lang) => {
  setLocale(lang)
}

provide('langState', langState)
provide('setLang', setLang)
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding-top: 60px;
}
</style>
