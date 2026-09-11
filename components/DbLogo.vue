<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import { configs } from "@slidev/client";

const props = defineProps({
  height: { type: String, default: "var(--db-logo-height)" },
  color: { type: String as PropType<"auto" | "red" | "white">, default: "auto" },
  additive: { type: String, default: undefined },
});

const themeConfig = computed(
  () => (configs.themeConfig ?? {}) as Record<string, unknown>,
);

const additive = computed(
  () => props.additive ?? String(themeConfig.value.sender ?? ""),
);

const white = computed(
  () =>
    props.color === "white" ||
    (props.color === "auto" && themeConfig.value.logoColor === "white"),
);

const style = computed(() => ({
  "--h": props.height,
  color: white.value ? "var(--db-white)" : "var(--db-logo)",
  "--db-logo-additive": white.value ? "var(--db-white)" : "var(--db-foreground)",
}));
</script>

<template>
  <div class="db-logo" :style="style">
    <svg
      class="db-logo__mark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 70"
      role="img"
      aria-label="Deutsche Bahn"
    >
      <path
        fill="currentColor"
        d="M89.9507,0H10.0492C4.551,0,0,4.3477,0,9.9669v49.9594c0,5.6189,4.551,10.0738,10.0492,10.0738h79.9015c5.4984,0,10.0493-4.4549,10.0493-10.0738V9.9669c0-5.6192-4.551-9.9669-10.0493-9.9669ZM92.6998,59.9262c0,1.5916-1.1644,2.8663-2.7491,2.8663H10.0492c-1.5847,0-2.749-1.2747-2.749-2.8663V9.9669c0-1.5916,1.1643-2.8629,2.749-2.8629h79.9015c1.5847,0,2.7491,1.2713,2.7491,2.8629v49.9594ZM30.582,57.9108H13.7561V12.089h16.8259c11.8511,0,18.3968,7.4249,18.3968,22.6973,0,13.2608-4.4304,23.0177-18.3968,23.1245ZM37.8854,35.7406c0-9.2297-.9577-16.4369-10.9001-16.4369h-2.2254v31.1791h3.9134c5.8222,0,9.212-4.665,9.212-14.7423ZM78.0427,33.9388c3.2446-.8585,8.0123-4.561,8.0123-10.6679,0-.9543-.1998-11.1652-13.0824-11.1652h-19.1723v45.8051h16.1978c4.2902,0,17.6592,0,17.6592-12.8826,0-3.2187-1.3126-9.2759-9.6146-11.0894ZM64.6967,19.1735h3.4678c4.9275,0,6.8843,1.7198,6.8843,5.5121,0,3.0134-2.1549,5.5425-5.9852,5.5425h-4.367v-11.0546ZM69.2057,50.4829h-4.509v-11.7743h4.8087c5.7171,0,7.1124,3.3359,7.1124,5.8877,0,5.8866-5.6668,5.8866-7.4121,5.8866Z"
      />
    </svg>
    <span v-if="additive" class="db-logo__additive">{{ additive }}</span>
  </div>
</template>

<style scoped>
.db-logo {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--h) * 0.4);
  height: var(--h);
  line-height: 1;
}

.db-logo__mark {
  height: 100%;
  width: auto;
  flex: none;
}

.db-logo__additive {
  font-family: "DB Screen Sans", system-ui, sans-serif;
  font-weight: 700;
  font-size: calc(var(--h) * 0.72);
  color: var(--db-logo-additive);
  white-space: nowrap;
}
</style>
