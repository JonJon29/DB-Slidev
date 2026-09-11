<script setup lang="ts">
// second column via ::right::
const props = defineProps({
  class: { type: String, default: undefined },
  layoutClass: { type: String, default: undefined },
});
</script>

<template>
  <DbSlide layout="two-cols" :class="props.layoutClass">
    <div class="db-cols">
      <div class="db-cols__col" :class="props.class">
        <slot />
      </div>
      <div class="db-cols__col" :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </DbSlide>
</template>

<style>
.db-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 var(--db-margin-x);
  flex: 1;
  min-height: 0;
}

.db-cols__col {
  min-width: 0;
}

.db-cols__col > :first-child {
  margin-top: 0;
}
</style>
