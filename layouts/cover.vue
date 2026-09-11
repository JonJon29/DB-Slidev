<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import { handleBackground } from "@slidev/client";

const props = defineProps({
  image: { type: String, default: undefined },
  background: { type: String, default: undefined },
  backgroundSize: { type: String, default: "cover" },
  overlay: { type: String, default: "dark-gradient" },
  class: { type: String, default: undefined },
  animation: { type: String as PropType<"in" | "loop" | "none">, default: "in" },
});

const image = computed(() => props.image ?? props.background);
const style = computed(() =>
  image.value ? handleBackground(image.value, false, props.backgroundSize) : {},
);
const onImage = computed(() => Boolean(image.value));
const lightOverlay = computed(() => props.overlay === "light-gradient");
</script>

<template>
  <div
    class="slidev-layout cover"
    :class="[
      props.class,
      onImage && ['db-on-image', `db-overlay--${overlay}`, 'cover--image'],
    ]"
    :style="style"
  >
    <div v-if="onImage" class="db-overlay" />
    <header class="cover__header">
      <DbLogo
        height="var(--db-logo-height-cover)"
        :color="onImage && !lightOverlay ? 'white' : 'auto'"
      />
    </header>
    <div class="cover__content">
      <slot />
    </div>
    <Schwelle
      class="cover__schwelle"
      variant="standard"
      height="calc(var(--db-logo-height-cover) * 2 / 3)"
      :stretch="1.8"
      color="red"
      :animate="animation === 'none' ? false : animation"
    />
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  padding-bottom: calc(var(--db-logo-height-cover) * 2 / 3 + var(--db-margin-y));
}

.cover__header,
.cover__content {
  position: relative;
  z-index: 1;
}

.cover__content {
  margin-top: auto;
  max-width: 75%;
}

.cover__content :deep(h1) {
  font-size: 3.25rem;
  margin-bottom: 0.75rem;
}

.cover__content :deep(h1 + p) {
  font-size: 1.375rem;
  color: var(--db-muted);
  margin-top: 0;
}

.cover__content :deep(p) {
  margin: 0.5rem 0;
}

.cover__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
