<script setup lang="ts">
const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="intro" :class="props.class" :logo="false" center>
    <slot />
  </DbSlide>
</template>
