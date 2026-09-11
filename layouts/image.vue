<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "@slidev/client";

const props = defineProps({
  image: { type: String, default: undefined },
  backgroundSize: { type: String, default: "cover" },
  overlay: { type: String, default: "dark-gradient" },
  align: { type: String, default: "left" },
  class: { type: String, default: undefined },
});

const style = computed(() => handleBackground(props.image, false, props.backgroundSize));
const lightOverlay = computed(() => props.overlay === "light-gradient");
</script>

<template>
  <div
    class="slidev-layout image db-on-image"
    :class="[props.class, `db-overlay--${overlay}`, `db-align--${align}`]"
    :style="style"
  >
    <div class="db-overlay" />
    <header class="image__header">
      <DbLogo
        height="var(--db-logo-height-cover)"
        :color="lightOverlay ? 'auto' : 'white'"
      />
    </header>
    <div class="image__content">
      <slot />
    </div>
    <Schwelle
      class="image__schwelle"
      variant="standard"
      height="calc(var(--db-logo-height-cover) * 2 / 3)"
      :stretch="1.8"
      color="red"
    />
  </div>
</template>

<style scoped>
.image {
  display: flex;
  flex-direction: column;
  padding-bottom: calc(var(--db-logo-height-cover) * 2 / 3 + var(--db-margin-y));
}

.image__header,
.image__content {
  position: relative;
  z-index: 1;
}

.image__content {
  margin-top: auto;
  max-width: 60%;
}

.db-align--right .image__header,
.db-align--right .image__content {
  align-self: flex-end;
  text-align: right;
}

.image__content :deep(h1) {
  font-size: 2.75rem;
}

.image__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.db-align--right .image__schwelle {
  right: auto;
  left: 0;
}
</style>
