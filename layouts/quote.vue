<script setup lang="ts">

const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="quote" :class="props.class" center>
    <div class="db-quote">
      <Schwelle
        class="db-quote__schwelle"
        variant="standard"
        orientation="vertical"
        height="0.875rem"
        color="red"
      />
      <div class="db-quote__body">
        <slot />
      </div>
    </div>
  </DbSlide>
</template>

<style>
.db-quote {
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  max-width: 85%;
}

.db-quote__schwelle {
  flex: none;
  margin-top: 0.5rem;
}

.db-quote__body > :first-child,
.db-quote__body > blockquote {
  font-family: "DB Screen Head", system-ui, sans-serif;
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 1.2;
  color: var(--db-headline);
  margin: 0 0 1rem;
  padding: 0;
  border: none;
}

.db-quote__body > :first-child + p {
  color: var(--db-muted);
  margin: 0;
}
</style>
