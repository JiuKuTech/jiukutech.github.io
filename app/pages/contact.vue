<template>
  <div class="image-container">
      <img src="/images/contact.png" alt="关于我们" />
  </div>
  <div class="contact-us">
    <h1>{{ $t("contact.title") }}</h1>
    <div class="layout-container">
      <div class="left-column">
        <h2>{{ $t("contact.phone") }}</h2>
        <p>{{ $t("contact.phone.value") }}</p>

        <h2>{{ $t("contact.email") }}</h2>
        <p>{{ $t("contact.email.value") }}</p>

        
        <h2>{{ $t("contact.address") }}</h2>
        <p>{{ $t("contact.address.value") }}</p>
      </div>
      <div class="right-column">
        <h2>{{ $t("contact.wechat") }}</h2>
        <img src="/images/wechat-QRC.png" alt="微信二维码" class="qr-code" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.contact-us {
  white-space: pre-line;
  text-align: center;
  padding: 2rem;
}
.contact-us h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  margin: 0 auto 1.5rem;
}
.contact-us h2 {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  font-weight: 400;
  margin: 0 auto 1.5rem;
}
.contact-us p {
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  font-weight: 300;
  color: #555;
  margin: 0 auto 1.5rem;
}
/* 图片容器样式 */
.image-container {
  width: 100%;
  height: 390px;
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 700px;
  object-fit: cover;
  display: block;
}

/* 左右布局容器 */
.layout-container {
  display: flex;
  gap: 4rem; /* 减小间距 */
  max-width: 1200px; /* 增加最大宽度 */
  margin: 2rem auto;
  align-items: flex-start;
}

.left-column {
  flex: 2; /* 左侧占更多空间 */
  min-width: 0; /* 允许flex子元素缩小 */
}

.right-column {
  flex: 1; /* 右侧占较少空间 */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 改为左对齐 */
}

.right-column h2 {
  text-align: left; /* 确保标题左对齐 */
  margin: 0 0 1.5rem 0; /* 覆盖全局的 margin: 0 auto */
}

/* 微信二维码样式 */
.qr-code {
  width: 200px;
  height: auto;
  display: block;
}

</style>