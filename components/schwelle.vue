<script setup>
import Line from "./line.vue";
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
  numberOfLines: {
    type: Number,
    default: 5,
  },
  minLinewidth: {
    type: Number,
    default: 2,
  }
})

</script>

<template>
  <div class="schwellen-div">
    <div v-for="i in numberOfLines * 2 - 1" :key="i">
      <Line v-if="i % 2 !== 0" :width="i * minLinewidth + 'px'" :height="height" :color="color" />
      <Line v-if="i % 2 === 0" :width="(numberOfLines * 2 - i) * minLinewidth + 'px'" :height="height" color="transparent" />
    </div>
  </div>
</template>

<style scoped>

.schwellen-div {
  display: flex;
  flex-direction: row;
}
</style>