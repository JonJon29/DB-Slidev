<script setup lang="ts">
import { computed } from "vue";
import { configs } from "@slidev/client";

// Confidentiality marker, top left on every slide (see slide-top.vue).
// headmatter: classification: internal | confidential | strictly-confidential
const LABELS: Record<string, string> = {
  internal: "DB Intern / DB internal",
  confidential: "DB Vertraulich / DB confidential",
  "strictly-confidential": "DB Streng Vertraulich / DB strictly confidential",
  "strictly confidential": "DB Streng Vertraulich / DB strictly confidential",
};

const label = computed(() => {
  const raw = (configs as unknown as Record<string, unknown>).classification;
  if (!raw) return "";
  return LABELS[String(raw).trim().toLowerCase()] ?? "";
});
</script>

<template>
  <div v-if="label" class="db-classification">{{ label }}</div>
</template>

<style scoped>
.db-classification {
  position: absolute;
  top: 0.6rem;
  left: var(--db-margin-x);
  z-index: 20;
  font-family: "DB Screen Sans", system-ui, sans-serif;
  font-size: 0.75rem;
  line-height: 1;
  color: var(--db-classification);
  pointer-events: none;
  user-select: none;
}
</style>
