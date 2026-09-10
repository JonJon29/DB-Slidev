<script setup lang="ts">
import { computed } from "vue";
import { configs } from "@slidev/client/env.ts";

/**
 * Confidentiality classification marker, shown in the top-left corner of
 * every slide. It is rendered on every slide by `global-top.vue`, which
 * just wraps this component; configure it once in the deck headmatter:
 *
 *   ---
 *   classification: confidential
 *   ---
 *
 * Accepted values: `internal`, `confidential`, `strictly-confidential`
 * (also written `strictly confidential`). Any other / missing value
 * hides the marker. The colour comes from the `--db-classification`
 * token in styles/layout.css: light red in light mode, dark red in dark
 * mode.
 */
const LABELS: Record<string, string> = {
  internal: "DB Intern / DB internal",
  confidential: "DB Vertraulich / DB confidential",
  "strictly-confidential": "DB Streng Vertraulich / DB strictly confidential",
  "strictly confidential": "DB Streng Vertraulich / DB strictly confidential",
};

const label = computed(() => {
  const raw = (configs as unknown as Record<string, unknown>).classification;
  if (!raw) return LABELS["internal"] ?? "error";
  return LABELS[String(raw).trim().toLowerCase()] ?? "error";
});
</script>

<template>
  <div v-if="label" class="db-classification">{{ label }}</div>
</template>

<style scoped>
.db-classification {
  position: absolute;
  top: 1px;
  left: 16px;
  z-index: 20;
  font-family: "DB Head", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--db-classification);
  pointer-events: none;
  user-select: none;
}
</style>
