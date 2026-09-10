<script setup>
const props = defineProps({
  height: {
    type: String,
    default: "100px",
  },
  width: {
    type: String,
    default: "20px",
  },
  color: {
    type: String,
    default: 'black',
  },
})
</script>

<template>
  <div class="line"></div>
</template>

<style scoped>
.line {
  height: v-bind('height');
  width: v-bind('width');
  background-color: v-bind('color');
}
</style>