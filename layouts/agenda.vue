<script setup lang="ts">
// Title + ordered list
const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="agenda" :class="props.class">
    <slot />
  </DbSlide>
</template>

<style>
.slidev-layout.agenda ol {
  list-style: none;
  counter-reset: db-agenda;
  margin: 0.5rem 0 0;
  padding: 0;
  columns: 1;
}

.slidev-layout.agenda ol > li {
  counter-increment: db-agenda;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  align-items: baseline;
  gap: 0 1rem;
  margin: 0;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--db-border);
  font-size: 1.25rem;
}

.slidev-layout.agenda ol > li::before {
  content: counter(db-agenda, decimal-leading-zero);
  font-family: "DB Screen Head", system-ui, sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1;
  color: var(--db-muted);
}
</style>
