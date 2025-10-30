<template>
  <div class="image-container">
      <img src="/images/csr.jpg" alt="社会责任" />
  </div>
  <div class="about-us">
    <h1>{{ $t("csr.title") }}</h1>
    <h2>{{ $t("csr.description") }}</h2>
    <p>{{ $t("csr.ceo") }}</p>
  </div>
</template>

<style scoped>
.about-us {
  white-space: pre-line;
  text-align: center;
  padding: 2rem;
}
.about-us h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  margin: 0 auto 1.5rem;  /* 上0 左右auto 下1.5rem */
}
.about-us h2 {
  max-width: 1200px;  /* 限制段落最大宽度 */
  margin: 0 auto;     /* 段落容器居中 */
  text-align: left;   /* 文本靠左对齐 */
  font-weight: 400;
  margin: 0 auto 1.5rem;  /* 上0 左右auto 下1.5rem */
}
.about-us p {
  max-width: 1200px;  /* 限制段落最大宽度 */
  margin: 0 auto;     /* 段落容器居中 */
  text-align: left;   /* 文本靠左对齐 */
  font-weight: 300;
  color: #555;
  margin: 0 auto 1.5rem;  /* 上0 左右auto 下1.5rem */
}
/* 图片容器样式 */
.image-container {
  width: 100%;
  height: 390px;
  overflow: hidden;
  position: relative; /* 添加相对定位作为参考点 */
}

.image-container img {
  width: 100%;
  height: 700px;
  object-fit: cover;  /* 保持宽高比裁剪 */
  display: block;
}


</style>