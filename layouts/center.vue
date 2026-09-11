<script setup lang="ts">
const props = defineProps({
  class: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="center" :class="props.class" center>
    <slot />
  </DbSlide>
</template>
