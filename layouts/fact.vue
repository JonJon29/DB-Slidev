<script setup lang="ts">
// big number (first headline) + description
const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="fact" :class="props.class" center>
    <slot />
  </DbSlide>
</template>

<style>
.slidev-layout.fact .db-slide__body > :is(h1, h2):first-child {
  font-size: 6rem;
  line-height: 1;
  margin-bottom: 0.5rem;
  padding-right: 0;
}

.slidev-layout.fact .db-slide__body > :is(h1, h2):first-child + p {
  font-size: 1.5rem;
  color: var(--db-muted);
  margin-top: 0;
}
</style>
