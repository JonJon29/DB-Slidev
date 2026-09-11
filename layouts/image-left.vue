<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "@slidev/client";

// Image panel left, text right
const props = defineProps({
  image: { type: String, default: undefined },
  backgroundSize: { type: String, default: "cover" },
  imageWidth: { type: String, default: "45%" },
  class: { type: String, default: undefined },
});

const style = computed(() => handleBackground(props.image, false, props.backgroundSize));
</script>

<template>
  <div class="db-image-split db-image-split--left" :style="{ '--w': imageWidth }">
    <div class="db-image-split__panel" :style="style">
      <Schwelle
        class="db-image-split__schwelle"
        variant="s"
        height="1.25rem"
        :stretch="2"
        color="white"
      />
    </div>
    <DbSlide layout="image-left" :class="props.class">
      <slot />
    </DbSlide>
  </div>
</template>
