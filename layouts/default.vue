<script setup>

import Schwelle from "../components/schwelle.vue";
</script>
<slot/>
<template>
  <div id="main">
    <slot/>
    <schwelle color="var(--db-red)" number-of-lines="12" height="50px" id="schwelle"/>
  </div>
</template>

<style scoped>
#main {
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
}

#schwelle {
  position: absolute;
  bottom: 0;
  right: 0;
}

</style>