<script setup lang="ts">
defineProps<{
  name: 'environment' | 'people' | 'governance' | 'future'
}>()
</script>

<template>
  <span class="semantic-icon" aria-hidden="true">
    <svg v-if="name === 'environment'" viewBox="0 0 32 32" fill="none">
      <path d="M25.7 5.4C16.5 5.6 10.3 9 8.3 14.1c-1.7 4.4.7 8.7 5.1 9.5 4.6.9 9-2.4 9.7-7.1.5-3.8 1.4-7.5 2.6-11.1Z" />
      <path d="M5.5 26.7c3.8-7.5 8.5-12.1 15.1-15.3" />
      <path d="M9.8 20.6c2.4-.1 4.5.4 6.2 1.5" />
    </svg>
    <svg v-else-if="name === 'people'" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10.2" r="4.2" />
      <path d="M8.2 25.8c.5-5.1 3.2-8 7.8-8s7.3 2.9 7.8 8" />
      <circle cx="6.8" cy="13.8" r="2.7" />
      <circle cx="25.2" cy="13.8" r="2.7" />
      <path d="M2.8 24.1c.3-3.8 2.2-5.9 5.6-5.9 1 0 1.9.2 2.6.5M29.2 24.1c-.3-3.8-2.2-5.9-5.6-5.9-1 0-1.9.2-2.6.5" />
    </svg>
    <svg v-else-if="name === 'governance'" viewBox="0 0 32 32" fill="none">
      <path d="M16 3.8c3.3 2.5 6.8 3.8 10.4 4v7.6c0 6.1-3.6 10.7-10.4 13-6.8-2.3-10.4-6.9-10.4-13V7.8c3.6-.2 7.1-1.5 10.4-4Z" />
      <path d="m11.1 16.1 3.2 3.2 6.8-7" />
    </svg>
    <svg v-else viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="9.8" />
      <path d="M6.8 12.6h18.4M6.8 19.4h18.4M16 6.2c2.8 2.7 4.3 6 4.3 9.8S18.8 23.1 16 25.8M16 6.2c-2.8 2.7-4.3 6-4.3 9.8s1.5 7.1 4.3 9.8" />
      <circle cx="25.6" cy="7" r="2.5" class="semantic-icon__node" />
      <path d="m22.6 9-2.4 2" />
    </svg>
  </span>
</template>

<style scoped>
.semantic-icon {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: currentColor;
}

svg {
  width: 64%;
  height: 64%;
  overflow: visible;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.semantic-icon__node {
  fill: #fff;
}
</style>
