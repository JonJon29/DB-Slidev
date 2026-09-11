<script setup lang="ts">
// default slot = header, columns via ::left:: and ::right::
const props = defineProps({
  class: { type: String, default: undefined },
  layoutClass: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="two-cols-header" :class="props.layoutClass">
    <div class="db-cols__header">
      <slot />
    </div>
    <div class="db-cols">
      <div class="db-cols__col" :class="props.class">
        <slot name="left" />
      </div>
      <div class="db-cols__col" :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </DbSlide>
</template>
