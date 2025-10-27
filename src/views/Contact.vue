<template>
  <section>
    <h2>联系</h2>
    <p>邮箱: contact@jiuku.com</p>
    <form @submit.prevent="submit">
      <input v-model="name" placeholder="姓名" required />
      <input v-model="email" placeholder="邮箱" type="email" required />
      <textarea v-model="message" placeholder="留言" required></textarea>
      <button type="submit">发送</button>
    </form>
  </section>
</template>
<script>
export default {
  data() { return { name: '', email: '', message: '' } },
  methods: {
    submit() {
      alert('已提交，感谢联系！')
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>