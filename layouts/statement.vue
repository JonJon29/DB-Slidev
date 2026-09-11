<script setup lang="ts">
const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="statement" :class="props.class" center>
    <slot />
  </DbSlide>
</template>

<style>
.slidev-layout.statement .db-slide__body {
  max-width: 85%;
}

.slidev-layout.statement .db-slide__body :is(h1, h2, p) {
  font-family: "DB Screen Head", system-ui, sans-serif;
  font-weight: 900;
  font-size: 3rem;
  line-height: 1.1;
  color: var(--db-headline);
  margin: 0;
}
</style>
