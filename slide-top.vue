<script setup lang="ts">
import { useSlideContext } from "@slidev/client";

const { $page } = useSlideContext();
</script>

<template>
  <span :id="`db-slide-${$page}`" class="db-slide-anchor" />
  <Classification />
</template>

<style scoped>
.db-slide-anchor {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
}
</style>
