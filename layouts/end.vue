<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  class: { type: String, default: undefined },
  animation: { type: String as PropType<"in" | "loop" | "none">, default: "in" },
});
</script>

<template>
  <div class="slidev-layout end" :class="props.class">
    <header class="end__header">
      <DbLogo height="var(--db-logo-height-cover)" />
    </header>
    <div class="end__content">
      <slot>
        <h1>Vielen Dank</h1>
      </slot>
    </div>
    <Schwelle
      class="end__schwelle"
      variant="standard"
      height="calc(var(--db-logo-height-cover) * 2 / 3)"
      :stretch="2"
      color="red"
      :animate="animation === 'none' ? false : animation"
    />
  </div>
</template>

<style scoped>
.end {
  display: flex;
  flex-direction: column;
  padding-bottom: calc(var(--db-logo-height-cover) * 2 / 3 + var(--db-margin-y));
}

.end__content {
  margin-top: auto;
  max-width: 75%;
}

.end__content :deep(h1) {
  font-size: 3.25rem;
  margin-bottom: 1rem;
}

.end__content :deep(p) {
  margin: 0.4rem 0;
  color: var(--db-muted);
}

.end__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
