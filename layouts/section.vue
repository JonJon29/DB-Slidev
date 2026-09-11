<script setup lang="ts">
import type { PropType } from "vue";
// Chapter divider. Frontmatter: number, inverted (default true), animation
const props = defineProps({
  number: { type: [String, Number], default: undefined },
  inverted: { type: Boolean, default: true },
  class: { type: String, default: undefined },
  animation: { type: String as PropType<"in" | "loop" | "none">, default: "in" },
});
</script>

<template>
  <div class="slidev-layout section" :class="[props.class, { 'db-inverted': inverted }]">
    <div v-if="number !== undefined" class="section__number">{{ number }}</div>
    <div class="section__content">
      <slot />
    </div>
    <Schwelle
      class="section__schwelle"
      variant="standard"
      height="var(--db-logo-height-cover)"
      :stretch="1.5"
      color="red"
      :animate="animation === 'none' ? false : animation"
    />
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: calc(var(--db-logo-height-cover) + var(--db-margin-y));
}

.section__number {
  font-family: "DB Screen Head", system-ui, sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.1;
  color: var(--db-muted);
  margin-bottom: 0.75rem;
}

.section__content {
  max-width: 80%;
}

.section__content :deep(h1) {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.section__content :deep(h1 + p) {
  font-size: 1.375rem;
  color: var(--db-muted);
}

.section__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
