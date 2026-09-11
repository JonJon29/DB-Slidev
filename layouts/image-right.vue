<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "@slidev/client";

// Text left, image panel right. Frontmatter: image, imageWidth
const props = defineProps({
  image: { type: String, default: undefined },
  backgroundSize: { type: String, default: "cover" },
  imageWidth: { type: String, default: "45%" },
  class: { type: String, default: undefined },
});

const style = computed(() => handleBackground(props.image, false, props.backgroundSize));
</script>

<template>
  <div class="db-image-split db-image-split--right" :style="{ '--w': imageWidth }">
    <DbSlide layout="image-right" :class="props.class" :schwelle="false">
      <slot />
    </DbSlide>
    <div class="db-image-split__panel" :style="style">
      <Schwelle
        class="db-image-split__schwelle"
        variant="s"
        height="1.25rem"
        :stretch="2"
        color="white"
      />
    </div>
  </div>
</template>

<style>
.db-image-split {
  display: grid;
  grid-template-columns: 1fr var(--w);
  width: 100%;
  height: 100%;
}

.db-image-split--left {
  grid-template-columns: var(--w) 1fr;
}

.db-image-split .slidev-layout {
  height: 100%;
}

.db-image-split__panel {
  position: relative;
  overflow: hidden;
  background-color: var(--db-grey-300);
}

.db-image-split__schwelle {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
